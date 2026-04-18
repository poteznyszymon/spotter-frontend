import { Routes } from '@angular/router';
import { privateGuard } from './guards/private.guard';
import { publicGuard } from './guards/public.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [privateGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home').then(m => m.Home),
      },
    ],
  },
  {
    path: '',
    canActivate: [publicGuard],
    loadChildren: () => import('./pages/auth/auth-routing-module')
      .then(m => m.AuthRoutingModule),
  },
];
