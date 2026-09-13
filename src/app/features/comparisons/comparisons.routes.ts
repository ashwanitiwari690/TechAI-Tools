import { Routes } from '@angular/router';

export const COMPARISONS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/comparisons-list/comparisons-list').then((m) => m.ComparisonsList)
  },
  {
    path: ':slug',
    loadComponent: () => import('./pages/comparison-detail/comparison-detail').then((m) => m.ComparisonDetail)
  }
];
