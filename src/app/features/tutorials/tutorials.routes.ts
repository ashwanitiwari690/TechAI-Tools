import { Routes } from '@angular/router';

export const TUTORIALS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/tutorials-list/tutorials-list').then((m) => m.TutorialsList)
  },
  {
    path: ':slug',
    loadComponent: () => import('./pages/tutorial-detail/tutorial-detail').then((m) => m.TutorialDetail)
  }
];
