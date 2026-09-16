import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

export type EarnivoStatus =
  | 'inactive'
  | 'loading'
  | 'waiting'
  | 'ready'
  | 'claiming'
  | 'claimed'
  | 'error';

interface EarnivoApiEnvelope<T> {
  success: boolean;
  data: T;
  error?: { code: string; message: string };
}

interface EarnivoSessionData {
  campaignName: string;
  taskTitle: string;
  rewardAmount: string;
  requiredSeconds: number;
  remainingSeconds: number;
  status: string;
  alreadyCompleted: boolean;
  expired: boolean;
}

interface EarnivoConfirmData {
  status: string;
  rewardAmount: string | null;
  alreadyCompleted: boolean;
}

interface StoredClaim {
  campaignName: string;
  taskTitle: string;
  rewardAmount: string | null;
}

const TOKEN_PARAM = 'ev_token';
const TOKEN_STORAGE_KEY = 'earnivo_token';
const CLAIM_STORAGE_PREFIX = 'earnivo_claim_';
const DISMISSED_STORAGE_PREFIX = 'earnivo_dismissed_';

@Injectable({ providedIn: 'root' })
export class EarnivoService {
  private readonly http = inject(HttpClient);

  private readonly _status = signal<EarnivoStatus>('inactive');
  private readonly _campaignName = signal('');
  private readonly _taskTitle = signal('');
  private readonly _rewardAmount = signal<string | null>(null);
  private readonly _requiredSeconds = signal(0);
  private readonly _remainingSeconds = signal(0);
  private readonly _errorMessage = signal('');
  private readonly _lastClaimError = signal<string | null>(null);
  private readonly _pageActive = signal(this.isPageActive());

  readonly status = this._status.asReadonly();
  readonly campaignName = this._campaignName.asReadonly();
  readonly taskTitle = this._taskTitle.asReadonly();
  readonly rewardAmount = this._rewardAmount.asReadonly();
  readonly requiredSeconds = this._requiredSeconds.asReadonly();
  readonly remainingSeconds = this._remainingSeconds.asReadonly();
  readonly errorMessage = this._errorMessage.asReadonly();
  readonly lastClaimError = this._lastClaimError.asReadonly();

  readonly paused = computed(
    () => this._status() === 'waiting' && !this._pageActive(),
  );

  readonly progressPercent = computed(() => {
    const required = this._requiredSeconds();

    if (required <= 0) {
      return 100;
    }

    return Math.round(
      ((required - this._remainingSeconds()) / required) * 100,
    );
  });

  private token: string | null = null;
  private listenersBound = false;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  /**
   * Initializes the Earnivo visit.
   *
   * The token passed by the widget is preferred over sessionStorage.
   * This is important when the user arrives from another campaign link
   * while the same browser tab already contains an older token.
   */
  init(token?: string | null): void {
    if (typeof window === 'undefined') {
      return;
    }

    if (!environment.earnivoApiKey) {
      console.warn('[Earnivo] API key is not configured.');
      return;
    }

    const resolvedToken = this.normalizeToken(
      token ?? this.getTokenFromUrlOrStorage(),
    );

    console.log('[Earnivo] resolved token:', resolvedToken);

    if (!resolvedToken) {
      this.resetSessionState();
      return;
    }

    // A new URL token must replace any previous campaign state.
    if (this.token !== resolvedToken) {
      this.stopTimer();
      this.resetSessionState();
    }

    this.token = resolvedToken;
    this.write(TOKEN_STORAGE_KEY, resolvedToken);

    // Remove only ev_token from the address bar after it has been captured.
    this.removeTokenFromUrl();

    if (this.read(DISMISSED_STORAGE_PREFIX + resolvedToken) === '1') {
      this._status.set('inactive');
      return;
    }

    const cachedClaim = this.readClaim(resolvedToken);

    if (cachedClaim) {
      this._campaignName.set(cachedClaim.campaignName);
      this._taskTitle.set(cachedClaim.taskTitle);
      this._rewardAmount.set(cachedClaim.rewardAmount);
      this._status.set('claimed');
      return;
    }

    this.bindVisibilityListeners();
    void this.fetchSession(resolvedToken);
  }

  async claimReward(): Promise<void> {
    const currentToken = this.token;

    if (!currentToken || this._status() !== 'ready') {
      return;
    }

    this._lastClaimError.set(null);
    this._status.set('claiming');

    console.log('[Earnivo] Claiming reward with token:', currentToken);

    try {
      const res = await firstValueFrom(
        this.http.post<EarnivoApiEnvelope<EarnivoConfirmData>>(
          `${environment.earnivoApiBaseUrl}/website-verification/confirm`,
          {
            apiKey: environment.earnivoApiKey,
            token: currentToken,
          },
        ),
      );

      console.log('[Earnivo] Claim response:', res);

      if (!res.success || !res.data) {
        throw new Error(res.error?.message || 'Claim failed.');
      }

      const rewardAmount =
        res.data.rewardAmount ?? this._rewardAmount();

      this._rewardAmount.set(rewardAmount);

      this.writeClaim(currentToken, {
        campaignName: this._campaignName(),
        taskTitle: this._taskTitle(),
        rewardAmount,
      });

      this._status.set('claimed');
    } catch (err) {
      this._lastClaimError.set(
        this.extractMessage(
          err,
          'Could not claim your reward. Please try again.',
        ),
      );

      this._status.set('ready');
    }
  }

  dismiss(): void {
    this.stopTimer();

    if (
      this.token &&
      (this._status() === 'claimed' || this._status() === 'error')
    ) {
      this.write(
        DISMISSED_STORAGE_PREFIX + this.token,
        '1',
      );
    }

    this._status.set('inactive');
  }

  private async fetchSession(token: string): Promise<void> {
    this._status.set('loading');
    this._errorMessage.set('');

    console.log('[Earnivo] Fetching session with token:', token);
    console.log('[Earnivo] API:', environment.earnivoApiBaseUrl);

    try {
      const res = await firstValueFrom(
        this.http.post<EarnivoApiEnvelope<EarnivoSessionData>>(
          `${environment.earnivoApiBaseUrl}/website-verification/session`,
          {
            apiKey: environment.earnivoApiKey,
            token,
          },
        ),
      );

      console.log('[Earnivo] Session response:', res);

      if (this.token !== token) {
        return;
      }

      if (!res.success || !res.data) {
        throw new Error(
          res.error?.message || 'Unable to verify this visit link.',
        );
      }

      const data = res.data;

      this._campaignName.set(data.campaignName);
      this._taskTitle.set(data.taskTitle);
      this._rewardAmount.set(data.rewardAmount);

      if (data.alreadyCompleted) {
        this.writeClaim(token, {
          campaignName: data.campaignName,
          taskTitle: data.taskTitle,
          rewardAmount: data.rewardAmount,
        });

        this._status.set('claimed');
        return;
      }

      if (data.expired) {
        this._errorMessage.set(
          'This reward link has expired. Start the task again in the Earnivo app.',
        );
        this._status.set('error');
        return;
      }

      this._requiredSeconds.set(data.requiredSeconds);

      const remaining = Math.max(
        0,
        data.remainingSeconds ?? data.requiredSeconds ?? 0,
      );

      this._remainingSeconds.set(remaining);

      if (remaining <= 0) {
        this._status.set('ready');
        return;
      }

      this._status.set('waiting');
      this.evaluateTimer();
    } catch (err) {
      if (this.token !== token) {
        return;
      }

      console.error('[Earnivo] Session request failed:', err);

      this._errorMessage.set(
        this.extractMessage(
          err,
          'Unable to verify this visit link.',
        ),
      );

      this._status.set('error');
    }
  }

  private getTokenFromUrlOrStorage(): string | null {
    try {
      const url = new URL(window.location.href);
      const fromUrl = url.searchParams.get(TOKEN_PARAM);

      if (fromUrl) {
        console.log('[Earnivo] Token found in URL:', fromUrl);
        return fromUrl;
      }

      const storedToken = this.read(TOKEN_STORAGE_KEY);

      if (storedToken) {
        console.log('[Earnivo] Token found in sessionStorage:', storedToken);
      }

      return storedToken;
    } catch (error) {
      console.error('[Earnivo] Could not read URL token:', error);
      return null;
    }
  }

  private removeTokenFromUrl(): void {
    try {
      const url = new URL(window.location.href);

      if (!url.searchParams.has(TOKEN_PARAM)) {
        return;
      }

      url.searchParams.delete(TOKEN_PARAM);

      window.history.replaceState(
        window.history.state,
        '',
        url.pathname +
          (url.searchParams.toString()
            ? `?${url.searchParams.toString()}`
            : '') +
          url.hash,
      );
    } catch (error) {
      console.warn('[Earnivo] Could not clean token from URL:', error);
    }
  }

  private normalizeToken(token: string | null | undefined): string | null {
    const normalized = String(token ?? '').trim();
    return normalized || null;
  }

  private resetSessionState(): void {
    this.stopTimer();

    this.token = null;
    this._status.set('inactive');
    this._campaignName.set('');
    this._taskTitle.set('');
    this._rewardAmount.set(null);
    this._requiredSeconds.set(0);
    this._remainingSeconds.set(0);
    this._errorMessage.set('');
    this._lastClaimError.set(null);
  }

  private readClaim(token: string): StoredClaim | null {
    try {
      const raw = this.read(CLAIM_STORAGE_PREFIX + token);
      return raw ? (JSON.parse(raw) as StoredClaim) : null;
    } catch {
      return null;
    }
  }

  private writeClaim(token: string, claim: StoredClaim): void {
    this.write(
      CLAIM_STORAGE_PREFIX + token,
      JSON.stringify(claim),
    );
  }

  private read(key: string): string | null {
    try {
      return window.sessionStorage.getItem(key);
    } catch {
      return null;
    }
  }

  private write(key: string, value: string): void {
    try {
      window.sessionStorage.setItem(key, value);
    } catch {
      // Storage can be unavailable in some privacy modes.
    }
  }

  private isPageActive(): boolean {
    return (
      typeof document !== 'undefined' &&
      document.visibilityState === 'visible' &&
      document.hasFocus()
    );
  }

  private bindVisibilityListeners(): void {
    if (this.listenersBound) {
      return;
    }

    this.listenersBound = true;

    const handleActivityChange = () => {
      this._pageActive.set(this.isPageActive());
      this.evaluateTimer();
    };

    document.addEventListener(
      'visibilitychange',
      handleActivityChange,
    );

    window.addEventListener('focus', handleActivityChange);
    window.addEventListener('blur', handleActivityChange);
  }

  private evaluateTimer(): void {
    const shouldRun =
      this._status() === 'waiting' && this.isPageActive();

    if (shouldRun && this.intervalId === null) {
      this.intervalId = setInterval(() => this.tick(), 1000);
    } else if (!shouldRun && this.intervalId !== null) {
      this.stopTimer();
    }
  }

  private stopTimer(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private tick(): void {
    const next = this._remainingSeconds() - 1;

    if (next <= 0) {
      this._remainingSeconds.set(0);
      this.stopTimer();
      this._status.set('ready');
      return;
    }

    this._remainingSeconds.set(next);
  }

  private extractMessage(
    err: unknown,
    fallback: string,
  ): string {
    if (err instanceof HttpErrorResponse) {
      const body =
        err.error as EarnivoApiEnvelope<unknown> | null;

      return body?.error?.message || fallback;
    }

    if (err instanceof Error && err.message) {
      return err.message;
    }

    return fallback;
  }
}
