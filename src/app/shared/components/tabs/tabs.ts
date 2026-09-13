import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss'
})
export class Tabs {
  readonly tabs = input.required<string[]>();
  readonly activeIndex = input<number>(0);
  readonly tabChange = output<number>();
}
