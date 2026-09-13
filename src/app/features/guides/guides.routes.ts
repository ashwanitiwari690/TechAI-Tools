import { Routes } from '@angular/router';

export const GUIDES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/guides-list/guides-list').then((m) => m.GuidesList)
  },
  {
    path: ':slug',
    loadComponent: () => import('./pages/guide-detail/guide-detail').then((m) => m.GuideDetail)
  }
];
