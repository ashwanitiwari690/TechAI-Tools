import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { EarnivoService } from '../../../core/services/earnivo.service';

@Component({
  selector: 'app-earnivo-widget',
  templateUrl: './earnivo-widget.html',
  styleUrl: './earnivo-widget.scss',
})
export class EarnivoWidget implements OnInit {
  protected readonly earnivo = inject(EarnivoService);
  private readonly destroyRef = inject(DestroyRef);

  /** Gap from the viewport bottom, kept clear of whatever other fixed bottom UI (e.g. the cookie banner) is showing. */
  protected readonly bottomOffset = signal(16);

  protected readonly formattedTime = computed(() => {
    const seconds = Math.max(0, this.earnivo.remainingSeconds());
    if (seconds < 60) {
      return `${seconds}s`;
    }
    return `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, '0')}s`;
  });

  protected readonly showCloseButton = computed(
    () => this.earnivo.isTimerCompleted() || this.earnivo.status() === 'error',
  );

  ngOnInit(): void {
    this.initializeEarnivo();
    this.watchOtherFixedBottomUi();
  }

  /**
   * Capture the campaign token immediately from the real browser URL.
   *
   * The Earnivo app opens this site as:
   * https://your-site.com/?ev_token=...
   *
   * Do not depend on Angular route parameters here because `ev_token`
   * belongs to the external URL query string, not an Angular route segment.
   */
  private initializeEarnivo(): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const url = new URL(window.location.href);
      const token = url.searchParams.get('ev_token');

      console.log('[Earnivo Widget] Current URL:', window.location.href);
      console.log('[Earnivo Widget] ev_token:', token);

      if (token) {
        this.earnivo.init(token);
      } else {
        this.earnivo.init();
      }
    } catch (error) {
      console.error('[Earnivo Widget] Could not read URL:', error);
      this.earnivo.init();
    }
  }

  /**
   * The cookie-consent banner is the other fixed-bottom UI in this app, and its
   * height swings widely (buttons wrap on narrow phones). Rather than guess a
   * fixed offset, measure it live: a ResizeObserver on the banner element for
   * height changes, plus a MutationObserver — scoped to the cookie-consent host,
   * not document.body — to catch it being added or removed outright.
   */
  private watchOtherFixedBottomUi(): void {
    if (typeof document === 'undefined' || typeof ResizeObserver === 'undefined') {
      return;
    }

    const bannerHost = document.querySelector('app-cookie-consent');
    if (!bannerHost) {
      return;
    }

    let resizeObserver: ResizeObserver | null = null;

    const sync = (): void => {
      const banner = bannerHost.querySelector<HTMLElement>('.cookie-banner');

      if (banner) {
        if (!resizeObserver) {
          // Re-measure with getBoundingClientRect() rather than trusting the callback's
          // entries[0].contentRect — that reports the content box only, excluding the
          // banner's own padding/border, which would silently undercount its real footprint.
          resizeObserver = new ResizeObserver(() => {
            this.bottomOffset.set(16 + banner.getBoundingClientRect().height);
          });
          resizeObserver.observe(banner);
        }
        this.bottomOffset.set(16 + banner.getBoundingClientRect().height);
      } else {
        resizeObserver?.disconnect();
        resizeObserver = null;
        this.bottomOffset.set(16);
      }
    };

    sync();

    const mutationObserver = new MutationObserver(sync);
    mutationObserver.observe(bannerHost, { childList: true });

    this.destroyRef.onDestroy(() => {
      mutationObserver.disconnect();
      resizeObserver?.disconnect();
    });
  }
}
