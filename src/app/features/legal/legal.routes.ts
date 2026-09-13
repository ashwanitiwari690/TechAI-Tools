import { Routes } from '@angular/router';

export const LEGAL_ROUTES: Routes = [
  {
    path: 'about',
    loadComponent: () => import('./about/about').then((m) => m.About)
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact').then((m) => m.Contact)
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./privacy-policy/privacy-policy').then((m) => m.PrivacyPolicy)
  },
  {
    path: 'terms',
    loadComponent: () => import('./terms/terms').then((m) => m.Terms)
  },
  {
    path: 'disclaimer',
    loadComponent: () => import('./disclaimer/disclaimer').then((m) => m.Disclaimer)
  },
  {
    path: 'cookie-policy',
    loadComponent: () => import('./cookie-policy/cookie-policy').then((m) => m.CookiePolicy)
  }
];
