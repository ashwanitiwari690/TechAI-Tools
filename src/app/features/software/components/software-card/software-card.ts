import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SoftwareItem } from '../../../../core/models/software.model';
import { Card } from '../../../../shared/components/card/card';
import { Badge } from '../../../../shared/components/badge/badge';
import { Rating } from '../../../../shared/components/rating/rating';
import { FavoriteButton } from '../../../../shared/components/favorite-button/favorite-button';

@Component({
  selector: 'app-software-card',
  imports: [RouterLink, Card, Badge, Rating, FavoriteButton],
  templateUrl: './software-card.html',
  styleUrl: './software-card.scss'
})
export class SoftwareCard {
  readonly item = input.required<SoftwareItem>();
}
