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
  error?: {
    code: string;
    message: string;
  };
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

@Injectable({
  providedIn: 'root',
})
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

  private readonly _pageActive = signal(
    this.isPageActive()
  );

  readonly status = this._status.asReadonly();
  readonly campaignName = this._campaignName.asReadonly();
  readonly taskTitle = this._taskTitle.asReadonly();
  readonly rewardAmount = this._rewardAmount.asReadonly();
  readonly requiredSeconds = this._requiredSeconds.asReadonly();
  readonly remainingSeconds =
    this._remainingSeconds.asReadonly();
  readonly errorMessage =
    this._errorMessage.asReadonly();
  readonly lastClaimError =
    this._lastClaimError.asReadonly();

  readonly paused = computed(
    () =>
      this._status() === 'waiting' &&
      !this._pageActive()
  );

  readonly progressPercent = computed(() => {
    const required = this._requiredSeconds();
    const remaining = this._remainingSeconds();

    if (required <= 0) {
      return 100;
    }

    return Math.min(
      100,
      Math.max(
        0,
        Math.round(
          ((required - remaining) / required) * 100
        )
      )
    );
  });

  private token: string | null = null;

  private intervalId:
    ReturnType<typeof setInterval> | null = null;

  private listenersBound = false;

  /**
   * Initialize Earnivo session.
   *
   * Token is passed explicitly from the component.
   */
  async init(
    token?: string | null
  ): Promise<void> {
    if (!environment.earnivoApiKey) {
      return;
    }

    if (typeof window === 'undefined') {
      return;
    }

    const resolvedToken =
      this.normalizeToken(
        token ?? this.getTokenFromUrlOrStorage()
      );

    if (!resolvedToken) {
      this.reset();
      return;
    }

    /**
     * Same token is already active.
     */
    if (this.token === resolvedToken) {
      return;
    }

    /**
     * New token detected.
     * Reset previous session.
     */
    this.resetSessionState();

    this.token = resolvedToken;

    /**
     * Store token for current browser session.
     */
    sessionStorage.setItem(
      TOKEN_STORAGE_KEY,
      resolvedToken
    );

    /**
     * Remove token from URL.
     */
    this.removeTokenFromUrl();

    /**
     * Bind visibility listeners once.
     */
    this.bindVisibilityListeners();

    /**
     * Check cached claim.
     */
    const cachedClaim =
      this.readClaim(resolvedToken);

    if (cachedClaim) {
      this._campaignName.set(
        cachedClaim.campaignName
      );

      this._taskTitle.set(
        cachedClaim.taskTitle
      );

      this._rewardAmount.set(
        cachedClaim.rewardAmount
      );

      this._status.set('claimed');

      return;
    }

    await this.fetchSession(
      resolvedToken
    );
  }

  /**
   * Claim Earnivo reward.
   */
  async claimReward(): Promise<void> {
    const currentToken = this.token;

    if (!currentToken) {
      this._lastClaimError.set(
        'Reward token is missing.'
      );

      return;
    }

    if (this._status() !== 'ready') {
      return;
    }

    this._lastClaimError.set(null);
    this._status.set('claiming');

    try {
      const response =
        await firstValueFrom(
          this.http.post<
            EarnivoApiEnvelope<EarnivoConfirmData>
          >(
            `${environment.earnivoApiBaseUrl}/website-verification/confirm`,
            {
              apiKey:
                environment.earnivoApiKey,

              token: currentToken,
            }
          )
        );

      if (
        !response?.success ||
        !response?.data
      ) {
        throw new Error(
          response?.error?.message ||
          'Claim failed.'
        );
      }

      const rewardAmount =
        response.data.rewardAmount ??
        this._rewardAmount();

      this._rewardAmount.set(
        rewardAmount
      );

      this.writeClaim(
        currentToken,
        {
          campaignName:
            this._campaignName(),

          taskTitle:
            this._taskTitle(),

          rewardAmount,
        }
      );

      this.stopTimer();

      this._status.set('claimed');
    } catch (error) {
      this._lastClaimError.set(
        this.extractMessage(
          error,
          'Could not claim your reward. Please try again.'
        )
      );

      this._status.set('ready');
    }
  }

  /**
   * Hide the Earnivo widget.
   */
  dismiss(): void {
    this.stopTimer();

    const currentToken = this.token;
    const currentStatus = this._status();

    if (
      currentToken &&
      (
        currentStatus === 'claimed' ||
        currentStatus === 'error'
      )
    ) {
      sessionStorage.setItem(
        DISMISSED_STORAGE_PREFIX +
        currentToken,
        '1'
      );
    }

    this._status.set('inactive');
  }

  /**
   * Fetch campaign/session information.
   */
  private async fetchSession(
    token: string
  ): Promise<void> {
    this._status.set('loading');

    this._errorMessage.set('');
    this._lastClaimError.set(null);

    try {
      const response =
        await firstValueFrom(
          this.http.post<
            EarnivoApiEnvelope<EarnivoSessionData>
          >(
            `${environment.earnivoApiBaseUrl}/website-verification/session`,
            {
              apiKey:
                environment.earnivoApiKey,

              token,
            }
          )
        );

      if (
        !response?.success ||
        !response?.data
      ) {
        throw new Error(
          response?.error?.message ||
          'Unable to verify this visit link.'
        );
      }

      /**
       * Make sure response belongs
       * to currently active token.
       */
      if (this.token !== token) {
        return;
      }

      const data = response.data;

      this._campaignName.set(
        data.campaignName ?? ''
      );

      this._taskTitle.set(
        data.taskTitle ?? ''
      );

      this._rewardAmount.set(
        data.rewardAmount ?? null
      );

      /**
       * Already completed.
       */
      if (data.alreadyCompleted) {
        this.writeClaim(
          token,
          {
            campaignName:
              data.campaignName ?? '',

            taskTitle:
              data.taskTitle ?? '',

            rewardAmount:
              data.rewardAmount ?? null,
          }
        );

        this._status.set('claimed');

        return;
      }

      /**
       * Campaign expired.
       */
      if (data.expired) {
        this._errorMessage.set(
          'This reward link has expired. Start the task again in the Earnivo app.'
        );

        this._status.set('error');

        return;
      }

      /**
       * Prepare countdown.
       */
      const requiredSeconds =
        Math.max(
          0,
          Number(
            data.requiredSeconds ?? 0
          )
        );

      const remainingSeconds =
        Math.max(
          0,
          Number(
            data.remainingSeconds ??
            requiredSeconds
          )
        );

      this._requiredSeconds.set(
        requiredSeconds
      );

      this._remainingSeconds.set(
        remainingSeconds
      );

      /**
       * Already completed countdown.
       */
      if (remainingSeconds <= 0) {
        this.stopTimer();

        this._status.set('ready');

        return;
      }

      /**
       * Start waiting state.
       */
      this._status.set('waiting');

      this.evaluateTimer();
    } catch (error) {
      /**
       * Ignore old request errors.
       */
      if (this.token !== token) {
        return;
      }

      this._errorMessage.set(
        this.extractMessage(
          error,
          'Unable to verify this visit link.'
        )
      );

      this.stopTimer();

      this._status.set('error');
    }
  }

  /**
   * Get token from URL.
   *
   * URL parameter has priority over
   * sessionStorage.
   */
  private getTokenFromUrlOrStorage():
    string | null {
    if (
      typeof window === 'undefined'
    ) {
      return null;
    }

    try {
      const url = new URL(
        window.location.href
      );

      const urlToken =
        url.searchParams.get(
          TOKEN_PARAM
        );

      if (urlToken?.trim()) {
        return this.normalizeToken(
          urlToken
        );
      }

      return this.normalizeToken(
        sessionStorage.getItem(
          TOKEN_STORAGE_KEY
        )
      );
    } catch {
      return null;
    }
  }

  /**
   * Normalize token.
   */
  private normalizeToken(
    token:
      | string
      | null
      | undefined
  ): string | null {
    if (!token) {
      return null;
    }

    const normalized =
      token.trim();

    return normalized.length > 0
      ? normalized
      : null;
  }

  /**
   * Remove only ev_token from URL.
   */
  private removeTokenFromUrl(): void {
    try {
      const url = new URL(
        window.location.href
      );

      if (
        !url.searchParams.has(
          TOKEN_PARAM
        )
      ) {
        return;
      }

      url.searchParams.delete(
        TOKEN_PARAM
      );

      window.history.replaceState(
        window.history.state,
        '',
        url.toString()
      );
    } catch {
      // Ignore URL errors.
    }
  }

  /**
   * Reset entire service state.
   */
  private reset(): void {
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

  /**
   * Reset current campaign state
   * before loading a new token.
   */
  private resetSessionState(): void {
    this.stopTimer();

    this._status.set('inactive');
    this._campaignName.set('');
    this._taskTitle.set('');
    this._rewardAmount.set(null);
    this._requiredSeconds.set(0);
    this._remainingSeconds.set(0);
    this._errorMessage.set('');
    this._lastClaimError.set(null);
  }

  /**
   * Read previously claimed reward.
   */
  private readClaim(
    token: string
  ): StoredClaim | null {
    try {
      const raw =
        sessionStorage.getItem(
          CLAIM_STORAGE_PREFIX +
          token
        );

      if (!raw) {
        return null;
      }

      return JSON.parse(
        raw
      ) as StoredClaim;
    } catch {
      return null;
    }
  }

  /**
   * Store completed reward.
   */
  private writeClaim(
    token: string,
    claim: StoredClaim
  ): void {
    try {
      sessionStorage.setItem(
        CLAIM_STORAGE_PREFIX +
        token,
        JSON.stringify(claim)
      );
    } catch {
      // Ignore storage errors.
    }
  }

  /**
   * Check browser visibility.
   */
  private isPageActive(): boolean {
    return (
      typeof document !== 'undefined' &&
      document.visibilityState ===
      'visible'
    );
  }

  /**
   * Bind visibility listeners.
   */
  private bindVisibilityListeners(): void {
    if (
      this.listenersBound ||
      typeof document === 'undefined' ||
      typeof window === 'undefined'
    ) {
      return;
    }

    this.listenersBound = true;

    const handleActivityChange =
      (): void => {
        this._pageActive.set(
          this.isPageActive()
        );

        this.evaluateTimer();
      };

    document.addEventListener(
      'visibilitychange',
      handleActivityChange
    );

    window.addEventListener(
      'focus',
      handleActivityChange
    );

    window.addEventListener(
      'blur',
      handleActivityChange
    );
  }

  /**
   * Start or stop timer.
   */
  private evaluateTimer(): void {
    const shouldRun =
      this._status() === 'waiting' &&
      this._pageActive();

    if (
      shouldRun &&
      this.intervalId === null
    ) {
      this.intervalId =
        setInterval(
          () => this.tick(),
          1000
        );

      return;
    }

    if (
      !shouldRun &&
      this.intervalId !== null
    ) {
      this.stopTimer();
    }
  }

  /**
   * Countdown tick.
   */
  private tick(): void {
    if (
      this._status() !== 'waiting'
    ) {
      this.stopTimer();
      return;
    }

    const current =
      this._remainingSeconds();

    const next = Math.max(
      0,
      current - 1
    );

    this._remainingSeconds.set(
      next
    );

    if (next <= 0) {
      this.stopTimer();

      this._status.set('ready');
    }
  }

  /**
   * Stop countdown.
   */
  private stopTimer(): void {
    if (
      this.intervalId !== null
    ) {
      clearInterval(
        this.intervalId
      );

      this.intervalId = null;
    }
  }

  /**
   * Extract API error message.
   */
  private extractMessage(
    error: unknown,
    fallback: string
  ): string {
    if (
      error instanceof
      HttpErrorResponse
    ) {
      const body =
        error.error as
        | EarnivoApiEnvelope<unknown>
        | null
        | undefined;

      return (
        body?.error?.message ||
        error.message ||
        fallback
      );
    }

    if (
      error instanceof Error &&
      error.message
    ) {
      return error.message;
    }

    return fallback;
  }
}