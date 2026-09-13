import { Component, computed, inject, input } from '@angular/core';
import { FavoriteType, FavoritesService } from '../../../core/services/favorites.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.html',
  styleUrl: './favorite-button.scss'
})
export class FavoriteButton {
  private readonly favorites = inject(FavoritesService);
  private readonly toast = inject(ToastService);

  readonly type = input.required<FavoriteType>();
  readonly slug = input.required<string>();
  readonly name = input<string>('Item');

  readonly active = computed(() => this.favorites.isFavorite(this.type(), this.slug()));

  toggle(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.favorites.toggle(this.type(), this.slug());
    this.toast.show(
      this.active() ? `${this.name()} added to favorites` : `${this.name()} removed from favorites`,
      'success'
    );
  }
}
