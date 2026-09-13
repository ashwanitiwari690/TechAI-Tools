import { Routes } from '@angular/router';

export const DEVELOPER_TOOLS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/developer-tools-list/developer-tools-list').then((m) => m.DeveloperToolsList)
  },
  {
    path: 'json-formatter',
    loadComponent: () => import('./pages/json-formatter/json-formatter').then((m) => m.JsonFormatter)
  },
  {
    path: 'json-validator',
    loadComponent: () => import('./pages/json-validator/json-validator').then((m) => m.JsonValidator)
  },
  {
    path: 'json-minifier',
    loadComponent: () => import('./pages/json-minifier/json-minifier').then((m) => m.JsonMinifier)
  },
  {
    path: 'base64',
    loadComponent: () => import('./pages/base64/base64').then((m) => m.Base64Tool)
  },
  {
    path: 'url-encoder-decoder',
    loadComponent: () => import('./pages/url-encoder-decoder/url-encoder-decoder').then((m) => m.UrlEncoderDecoder)
  },
  {
    path: 'jwt-decoder',
    loadComponent: () => import('./pages/jwt-decoder/jwt-decoder').then((m) => m.JwtDecoder)
  },
  {
    path: 'uuid-generator',
    loadComponent: () => import('./pages/uuid-generator/uuid-generator').then((m) => m.UuidGenerator)
  },
  {
    path: 'timestamp-converter',
    loadComponent: () => import('./pages/timestamp-converter/timestamp-converter').then((m) => m.TimestampConverter)
  },
  {
    path: 'regex-tester',
    loadComponent: () => import('./pages/regex-tester/regex-tester').then((m) => m.RegexTester)
  },
  {
    path: 'word-counter',
    loadComponent: () => import('./pages/word-counter/word-counter').then((m) => m.WordCounter)
  },
  {
    path: 'case-converter',
    loadComponent: () => import('./pages/case-converter/case-converter').then((m) => m.CaseConverter)
  },
  {
    path: 'html-formatter',
    loadComponent: () => import('./pages/html-formatter/html-formatter').then((m) => m.HtmlFormatter)
  },
  {
    path: 'css-formatter',
    loadComponent: () => import('./pages/css-formatter/css-formatter').then((m) => m.CssFormatter)
  },
  {
    path: 'javascript-formatter',
    loadComponent: () => import('./pages/javascript-formatter/javascript-formatter').then((m) => m.JavascriptFormatter)
  },
  {
    path: 'color-converter',
    loadComponent: () => import('./pages/color-converter/color-converter').then((m) => m.ColorConverter)
  },
  {
    path: 'password-generator',
    loadComponent: () => import('./pages/password-generator/password-generator').then((m) => m.PasswordGenerator)
  },
  {
    path: 'lorem-ipsum-generator',
    loadComponent: () => import('./pages/lorem-ipsum-generator/lorem-ipsum-generator').then((m) => m.LoremIpsumGenerator)
  }
];
