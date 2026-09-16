import {
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';

import { EarnivoService } from '../../../core/services/earnivo.service';

@Component({
  selector: 'app-earnivo-widget',
  templateUrl: './earnivo-widget.html',
  styleUrl: './earnivo-widget.scss',
})
export class EarnivoWidget implements OnInit {
  protected readonly earnivo =
    inject(EarnivoService);

  private readonly destroyRef =
    inject(DestroyRef);

  /**
   * Gap from bottom of viewport.
   */
  protected readonly bottomOffset =
    signal(16);

  /**
   * Format countdown.
   */
  protected readonly formattedTime =
    computed(() => {
      const seconds = Math.max(
        0,
        this.earnivo.remainingSeconds()
      );

      if (seconds < 60) {
        return `${seconds}s`;
      }

      const minutes =
        Math.floor(seconds / 60);

      const remainingSeconds =
        String(
          seconds % 60
        ).padStart(2, '0');

      return `${minutes}m ${remainingSeconds}s`;
    });

  ngOnInit(): void {
    /**
     * Read ev_token directly from
     * the browser URL.
     *
     * Example:
     *
     * https://tech-ai-tools-bay.vercel.app/
     * ?ev_token=vt_xxxxx
     */
    this.initializeEarnivo();

    /**
     * Watch cookie consent banner.
     */
    this.watchOtherFixedBottomUi();
  }

  /**
   * Initialize Earnivo.
   */
  private initializeEarnivo(): void {
    if (
      typeof window === 'undefined'
    ) {
      return;
    }

    try {
      const url = new URL(
        window.location.href
      );

      const token =
        url.searchParams.get(
          'ev_token'
        );

      console.log(
        '[Earnivo Widget] Current URL:',
        window.location.href
      );

      console.log(
        '[Earnivo Widget] ev_token:',
        token
      );

      if (!token) {
        console.warn(
          '[Earnivo Widget] ev_token not found.'
        );

        /**
         * Service will check
         * sessionStorage.
         */
        void this.earnivo.init();

        return;
      }

      console.log(
        '[Earnivo Widget] Token found.'
      );

      /**
       * Pass exact token to service.
       */
      void this.earnivo.init(
        token
      );
    } catch (error) {
      console.error(
        '[Earnivo Widget] URL token error:',
        error
      );
    }
  }

  /**
   * Watch cookie consent banner.
   */
  private watchOtherFixedBottomUi(): void {
    if (
      typeof document === 'undefined' ||
      typeof ResizeObserver ===
        'undefined'
    ) {
      return;
    }

    const bannerHost =
      document.querySelector(
        'app-cookie-consent'
      );

    if (!bannerHost) {
      return;
    }

    let resizeObserver:
      | ResizeObserver
      | null = null;

    const sync = (): void => {
      const banner =
        bannerHost.querySelector<HTMLElement>(
          '.cookie-banner'
        );

      if (banner) {
        if (!resizeObserver) {
          resizeObserver =
            new ResizeObserver(
              () => {
                this.updateBottomOffset(
                  banner
                );
              }
            );

          resizeObserver.observe(
            banner
          );
        }

        this.updateBottomOffset(
          banner
        );
      } else {
        resizeObserver?.disconnect();

        resizeObserver = null;

        this.bottomOffset.set(16);
      }
    };

    sync();

    const mutationObserver =
      new MutationObserver(() => {
        sync();
      });

    mutationObserver.observe(
      bannerHost,
      {
        childList: true,
        subtree: true,
      }
    );

    this.destroyRef.onDestroy(() => {
      mutationObserver.disconnect();

      resizeObserver?.disconnect();
    });
  }

  /**
   * Update bottom offset.
   */
  private updateBottomOffset(
    banner: HTMLElement
  ): void {
    const bannerHeight =
      banner
        .getBoundingClientRect()
        .height;

    this.bottomOffset.set(
      16 + bannerHeight
    );
  }
}