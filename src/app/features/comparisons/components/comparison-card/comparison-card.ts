import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Comparison } from '../../../../core/models/comparison.model';
import { Card } from '../../../../shared/components/card/card';

@Component({
  selector: 'app-comparison-card',
  imports: [RouterLink, Card],
  templateUrl: './comparison-card.html',
  styleUrl: './comparison-card.scss'
})
export class ComparisonCard {
  readonly comparison = input.required<Comparison>();
}
