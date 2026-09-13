import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Guide } from '../../../../core/models/guide.model';
import { Card } from '../../../../shared/components/card/card';
import { Badge } from '../../../../shared/components/badge/badge';
import { FavoriteButton } from '../../../../shared/components/favorite-button/favorite-button';

@Component({
  selector: 'app-guide-card',
  imports: [RouterLink, Card, Badge, FavoriteButton],
  templateUrl: './guide-card.html',
  styleUrl: './guide-card.scss'
})
export class GuideCard {
  readonly guide = input.required<Guide>();
}
