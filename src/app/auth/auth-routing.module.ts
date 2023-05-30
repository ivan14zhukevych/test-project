import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../_core/guards/login.guard';
import {AuthGuard} from '../_core/guards/auth.guard';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';


const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        canActivate: [LoginGuard],
        component: LoginComponent,
      },
      {
        path: 'register',
        canActivate: [LoginGuard],
        component: RegisterComponent,
      },
      {
        path: 'forgot-password',
        canActivate: [LoginGuard],
        component: ForgotPasswordComponent,
      },
      {
        path: 'update-password',
        canActivate: [AuthGuard],
        component: UpdatePasswordComponent,
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
