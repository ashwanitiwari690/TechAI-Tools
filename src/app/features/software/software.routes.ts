import { Routes } from '@angular/router';

export const SOFTWARE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/software-list/software-list').then((m) => m.SoftwareList)
  },
  {
    path: ':slug',
    loadComponent: () => import('./pages/software-detail/software-detail').then((m) => m.SoftwareDetail)
  }
];
