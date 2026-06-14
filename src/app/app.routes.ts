import { Routes } from '@angular/router';
import { Shell } from './layout/shell/shell';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
      { path: 'projects', loadComponent: () => import('./pages/projects/projects').then(m => m.Projects) },
      { path: 'blog', loadComponent: () => import('./pages/blog/blog').then(m => m.Blog) },
      { path: 'about', loadComponent: () => import('./pages/about/about').then(m => m.About) },
    ],
  },
  { path: '**', redirectTo: '' },
];
