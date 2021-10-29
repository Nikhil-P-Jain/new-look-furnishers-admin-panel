import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NbAuthComponent } from '@nebular/auth';
import { NgxLoginComponent } from './login/login.component';
import { NgxLogoutComponent } from './logout/logout.component';
import { NgxRequestPasswordComponent } from './request-password/request-password.component';
import { NgxResetPasswordComponent } from './reset-password/reset-password.component';

export const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
  },
  {
    path: 'login',
    component: NgxLoginComponent,
  },
  {
    path:'logout',
    component:NgxLogoutComponent,
  },
  {
    path:'resetpassword',
    component:NgxResetPasswordComponent,
  },
  {
    path:'requestpassword',
    component:NgxRequestPasswordComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}