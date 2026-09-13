import { Routes } from '@angular/router';

export const AI_TOOLS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/ai-tools-list/ai-tools-list').then((m) => m.AiToolsList)
  },
  {
    path: ':slug',
    loadComponent: () => import('./pages/ai-tool-detail/ai-tool-detail').then((m) => m.AiToolDetail)
  }
];
