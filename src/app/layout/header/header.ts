import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService, ThemePreference } from '../../core/services/theme.service';
import { SearchBox } from '../../shared/components/search-box/search-box';
import { Dropdown, DropdownOption } from '../../shared/components/dropdown/dropdown';

interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, SearchBox, Dropdown],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  protected readonly theme = inject(ThemeService);

  readonly navLinks: NavLink[] = [
    { label: 'Home', path: '/' },
    { label: 'AI Tools', path: '/ai-tools' },
    { label: 'Developer Tools', path: '/developer-tools' },
    { label: 'Software', path: '/software' },
    { label: 'Tutorials', path: '/tutorials' },
    { label: 'Guides', path: '/guides' },
    { label: 'Comparisons', path: '/comparisons' }
  ];

  readonly themeOptions: DropdownOption[] = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'System', value: 'system' }
  ];

  readonly mobileMenuOpen = signal(false);
  readonly mobileSearchOpen = signal(false);

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((v) => !v);
    if (this.mobileMenuOpen()) {
      this.mobileSearchOpen.set(false);
    }
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  toggleMobileSearch(): void {
    this.mobileSearchOpen.update((v) => !v);
  }

  onThemeChange(value: string): void {
    this.theme.setPreference(value as ThemePreference);
  }
}
