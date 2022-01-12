import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MsalGuard } from '@azure/msal-angular';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: HomeComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    /* canActivate: [MsalGuard] */
  }
];
const isIframe = window !== window.parent && !window.opener;
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: !isIframe ? 'enabled' : 'disabled' // Don't perform initial navigation in iframes
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
