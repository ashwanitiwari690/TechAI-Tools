import { Component, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  imports: [NgTemplateOutlet, RouterLink],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly type = input<'button' | 'submit'>('button');
  readonly disabled = input(false);
  readonly routerLink = input<string[] | string | null>(null);
  readonly href = input<string | null>(null);
  readonly fullWidth = input(false);
}
