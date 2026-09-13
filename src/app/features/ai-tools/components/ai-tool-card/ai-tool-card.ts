import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AiTool } from '../../../../core/models/ai-tool.model';
import { Card } from '../../../../shared/components/card/card';
import { Badge } from '../../../../shared/components/badge/badge';
import { Rating } from '../../../../shared/components/rating/rating';
import { FavoriteButton } from '../../../../shared/components/favorite-button/favorite-button';

@Component({
  selector: 'app-ai-tool-card',
  imports: [RouterLink, Card, Badge, Rating, FavoriteButton],
  templateUrl: './ai-tool-card.html',
  styleUrl: './ai-tool-card.scss'
})
export class AiToolCard {
  readonly tool = input.required<AiTool>();
}
