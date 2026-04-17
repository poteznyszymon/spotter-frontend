import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./pages/auth/auth-routing-module')
      .then(m => m.AuthRoutingModule)
  }
];
