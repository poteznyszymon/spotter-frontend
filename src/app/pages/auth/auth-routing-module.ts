import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { publicGuard } from '../../guards/public.guard';

const routes: Routes = [
  {
    canActivate: [publicGuard],
    path: "login",
    component: Login,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
