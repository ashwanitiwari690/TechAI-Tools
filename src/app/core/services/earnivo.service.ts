import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

export type EarnivoStatus =
  'inactive' | 'loading' | 'waiting' | 'ready' | 'claiming' | 'claimed' | 'error';

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

/**
 * Root-provided state for the Earnivo visit-reward widget. Survives client-side
 * navigation because it's a singleton, unlike a component that gets torn down
 * and rebuilt as the router swaps pages.
 */
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

  /** True while a countdown exists but is stalled because the tab isn't actively being looked at. */
  readonly paused = computed(() => this._status() === 'waiting' && !this._pageActive());

  /** Measured against the full required duration, so a visitor resuming mid-visit sees a part-filled bar, not an empty one. */
  readonly progressPercent = computed(() => {
    const required = this._requiredSeconds();
    if (required <= 0) {
      return 100;
    }
    return Math.round(((required - this._remainingSeconds()) / required) * 100);
  });

  private token: string | null = null;
  private initialized = false;
  private listenersBound = false;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  /**
   * Reads the token, checks whether it's already been claimed or dismissed, and —
   * if neither — validates it with Earnivo. Safe to call multiple times; only the
   * first call does anything. No-ops entirely (no storage access, no network calls,
   * no listeners) when no API key is configured or no token is present, so the
   * widget stays inert on deployments that never opted into a campaign.
   */
  init(): void {
    if (this.initialized) {
      return;
    }
    this.initialized = true;

    if (!environment.earnivoApiKey || typeof window === 'undefined') {
      return;
    }

    this.token = this.resolveToken();
    if (!this.token) {
      return;
    }

    // A visitor who explicitly closed the card on a finished task (claimed, or a
    // dead link) already saw everything it had to say — a refresh shouldn't put
    // it back in front of them. Checked before the claimed-state cache on purpose:
    // closing a completed claim is exactly the case this guards.
    if (sessionStorage.getItem(DISMISSED_STORAGE_PREFIX + this.token) === '1') {
      return;
    }

    const cachedClaim = this.readClaim(this.token);
    if (cachedClaim) {
      this._campaignName.set(cachedClaim.campaignName);
      this._taskTitle.set(cachedClaim.taskTitle);
      this._rewardAmount.set(cachedClaim.rewardAmount);
      this._status.set('claimed');
      return;
    }

    this.bindVisibilityListeners();
    void this.fetchSession();
  }

  async claimReward(): Promise<void> {
    if (this._status() !== 'ready' || !this.token) {
      return;
    }

    this._lastClaimError.set(null);
    this._status.set('claiming');

    try {
      const res = await firstValueFrom(
        this.http.post<EarnivoApiEnvelope<EarnivoConfirmData>>(
          `${environment.earnivoApiBaseUrl}/website-verification/confirm`,
          { apiKey: environment.earnivoApiKey, token: this.token },
        ),
      );

      if (!res.success || !res.data) {
        throw new Error(res.error?.message || 'Claim failed.');
      }

      const rewardAmount = res.data.rewardAmount ?? this._rewardAmount();
      this._rewardAmount.set(rewardAmount);
      this.writeClaim(this.token, {
        campaignName: this._campaignName(),
        taskTitle: this._taskTitle(),
        rewardAmount,
      });
      this._status.set('claimed');
    } catch (err) {
      // Retryable — a visitor who genuinely earned the reward shouldn't get stranded.
      this._lastClaimError.set(
        this.extractMessage(err, 'Could not claim your reward. Please try again.'),
      );
      this._status.set('ready');
    }
  }

  /**
   * Hides the card. A terminal state (claimed, or a dead link) is remembered past
   * this tab session so a refresh doesn't put it back in front of the visitor.
   * Dismissing mid-task (waiting/ready) is treated as "hide for now" only — the
   * visitor still has an unclaimed reward, and a refresh should still offer it.
   */
  dismiss(): void {
    this.stopTimer();
    if (this.token && (this._status() === 'claimed' || this._status() === 'error')) {
      sessionStorage.setItem(DISMISSED_STORAGE_PREFIX + this.token, '1');
    }
    this._status.set('inactive');
  }

  private async fetchSession(): Promise<void> {
    this._status.set('loading');

    try {
      const res = await firstValueFrom(
        this.http.post<EarnivoApiEnvelope<EarnivoSessionData>>(
          `${environment.earnivoApiBaseUrl}/website-verification/session`,
          { apiKey: environment.earnivoApiKey, token: this.token },
        ),
      );

      if (!res.success || !res.data) {
        throw new Error(res.error?.message || 'Unable to verify this visit link.');
      }

      const data = res.data;

      this._campaignName.set(data.campaignName);
      this._taskTitle.set(data.taskTitle);
      this._rewardAmount.set(data.rewardAmount);

      if (data.alreadyCompleted) {
        this.writeClaim(this.token as string, {
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
      const remaining = Math.max(0, data.remainingSeconds ?? data.requiredSeconds ?? 0);
      this._remainingSeconds.set(remaining);

      if (remaining <= 0) {
        this._status.set('ready');
      } else {
        this._status.set('waiting');
        this.evaluateTimer();
      }
    } catch (err) {
      this._errorMessage.set(this.extractMessage(err, 'Unable to verify this visit link.'));
      this._status.set('error');
    }
  }

  private resolveToken(): string | null {
    const url = new URL(window.location.href);
    const fromUrl = url.searchParams.get(TOKEN_PARAM);

    if (fromUrl) {
      // One-time credential for this visit — belongs in sessionStorage, not localStorage.
      sessionStorage.setItem(TOKEN_STORAGE_KEY, fromUrl);
      url.searchParams.delete(TOKEN_PARAM);
      window.history.replaceState(history.state, '', url.toString());
      return fromUrl;
    }

    return sessionStorage.getItem(TOKEN_STORAGE_KEY);
  }

  private readClaim(token: string): StoredClaim | null {
    try {
      const raw = sessionStorage.getItem(CLAIM_STORAGE_PREFIX + token);
      return raw ? (JSON.parse(raw) as StoredClaim) : null;
    } catch {
      return null;
    }
  }

  private writeClaim(token: string, claim: StoredClaim): void {
    sessionStorage.setItem(CLAIM_STORAGE_PREFIX + token, JSON.stringify(claim));
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

    document.addEventListener('visibilitychange', handleActivityChange);
    window.addEventListener('focus', handleActivityChange);
    window.addEventListener('blur', handleActivityChange);
  }

  /** Starts or stops the interval to match current status + tab activity, never touching remainingSeconds itself. */
  private evaluateTimer(): void {
    const shouldRun = this._status() === 'waiting' && this.isPageActive();

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

  private extractMessage(err: unknown, fallback: string): string {
    if (err instanceof HttpErrorResponse) {
      const body = err.error as EarnivoApiEnvelope<unknown> | null;
      return body?.error?.message || fallback;
    }
    if (err instanceof Error && err.message) {
      return err.message;
    }
    return fallback;
  }
}
