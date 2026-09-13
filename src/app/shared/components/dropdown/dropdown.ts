import { Component, ElementRef, HostListener, inject, input, output, signal } from '@angular/core';

export interface DropdownOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.scss'
})
export class Dropdown {
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly label = input.required<string>();
  readonly options = input.required<DropdownOption[]>();
  readonly selectedValue = input<string | null>(null);
  readonly valueChange = output<string>();

  readonly open = signal(false);

  get selectedLabel(): string {
    return this.options().find((o) => o.value === this.selectedValue())?.label ?? this.label();
  }

  toggle(): void {
    this.open.update((v) => !v);
  }

  select(option: DropdownOption): void {
    this.valueChange.emit(option.value);
    this.open.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.open.set(false);
    }
  }
}
