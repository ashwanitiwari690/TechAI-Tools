import {Component,DestroyRef,OnInit,computed,inject,signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EarnivoService } from '../../../core/services/earnivo.service';

@Component({
  selector: 'app-earnivo-widget',
  templateUrl: './earnivo-widget.html',
  styleUrl: './earnivo-widget.scss',
})
export class EarnivoWidget implements OnInit {
  protected readonly earnivo = inject(EarnivoService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  protected readonly bottomOffset = signal(16);
  protected readonly formattedTime = computed(() => {
      const seconds = Math.max(
        0,
        this.earnivo.remainingSeconds()
      );

      if (seconds < 60) {
        return `${seconds}s`;
      }

      const minutes =
        Math.floor(seconds / 60);

      const remaining =
        String(seconds % 60).padStart(
          2,
          '0'
        );

      return `${minutes}m ${remaining}s`;
    });

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      (params) => {
        const token =
          params.get('ev_token');

        void this.earnivo.init(
          token
        );
      }
    );
    this.watchOtherFixedBottomUi();
  }


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
      new MutationObserver(
        () => {
          sync();
        }
      );

    mutationObserver.observe(
      bannerHost,
      {
        childList: true,
        subtree: true,
      }
    );

    this.destroyRef.onDestroy(
      () => {
        mutationObserver.disconnect();

        resizeObserver?.disconnect();
      }
    );
  }

  /**
   * Update widget bottom offset.
   */
  private updateBottomOffset(
    banner: HTMLElement
  ): void {
    const bannerHeight =
      banner.getBoundingClientRect()
        .height;

    this.bottomOffset.set(
      16 + bannerHeight
    );
  }
}