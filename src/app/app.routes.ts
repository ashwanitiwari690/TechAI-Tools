import { Routes } from '@angular/router';
import { LEGAL_ROUTES } from './features/legal/legal.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home)
  },
  {
    path: 'ai-tools',
    loadChildren: () => import('./features/ai-tools/ai-tools.routes').then((m) => m.AI_TOOLS_ROUTES)
  },
  {
    path: 'developer-tools',
    loadChildren: () => import('./features/developer-tools/developer-tools.routes').then((m) => m.DEVELOPER_TOOLS_ROUTES)
  },
  {
    path: 'software',
    loadChildren: () => import('./features/software/software.routes').then((m) => m.SOFTWARE_ROUTES)
  },
  {
    path: 'tutorials',
    loadChildren: () => import('./features/tutorials/tutorials.routes').then((m) => m.TUTORIALS_ROUTES)
  },
  {
    path: 'guides',
    loadChildren: () => import('./features/guides/guides.routes').then((m) => m.GUIDES_ROUTES)
  },
  {
    path: 'comparisons',
    loadChildren: () => import('./features/comparisons/comparisons.routes').then((m) => m.COMPARISONS_ROUTES)
  },
  {
    path: 'search',
    loadComponent: () => import('./features/search/search').then((m) => m.Search)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./features/favorites/favorites').then((m) => m.Favorites)
  },
  ...LEGAL_ROUTES,
  {
    path: '404',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound)
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound)
  }
];
