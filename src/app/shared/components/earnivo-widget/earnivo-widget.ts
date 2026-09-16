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

  ngOnInit(): void {
    this.earnivo.init();
    this.watchOtherFixedBottomUi();
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
