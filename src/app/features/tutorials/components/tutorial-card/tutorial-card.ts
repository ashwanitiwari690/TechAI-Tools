import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Tutorial } from '../../../../core/models/tutorial.model';
import { Card } from '../../../../shared/components/card/card';
import { Badge } from '../../../../shared/components/badge/badge';
import { FavoriteButton } from '../../../../shared/components/favorite-button/favorite-button';

@Component({
  selector: 'app-tutorial-card',
  imports: [RouterLink, Card, Badge, FavoriteButton],
  templateUrl: './tutorial-card.html',
  styleUrl: './tutorial-card.scss'
})
export class TutorialCard {
  readonly tutorial = input.required<Tutorial>();
}
