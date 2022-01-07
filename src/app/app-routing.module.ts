import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MsalGuard } from '@azure/msal-angular';
import { LoginComponent } from './components/login/login.component';
const routes: Routes = [
  {
    path: 'profile',
    component: HomeComponent,
    canActivate: [MsalGuard]
  },
  {
    path: '',
    component: HomeComponent
  }];
const isIframe = window !== window.parent && !window.opener;
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: !isIframe ? 'enabled' : 'disabled' // Don't perform initial navigation in iframes
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
