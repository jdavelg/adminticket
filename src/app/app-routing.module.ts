import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MsalGuard } from '@azure/msal-angular';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { TtypesComponent } from './components/ttypes/ttypes.component';
import { TcategoryComponent } from './components/tcategory/tcategory.component';
import { MarkComponent } from './components/mark/mark.component';
import { EquipmentTypeComponent } from './components/equipment-type/equipment-type.component';
import { ModelsComponent } from './components/models/models.component';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: HomeComponent,
   /*  canActivate: [MsalGuard] */
  },
  {
    path: 'users',
    component: UsersComponent,
    /* canActivate: [MsalGuard] */
  },
  {
    path: 'departments',
    component: DepartmentsComponent,
    /* canActivate: [MsalGuard] */
  },
  {
    path: 'TicketTypes',
    component: TtypesComponent,
    /* canActivate: [MsalGuard] */
  },
  {
    path: 'TicketCategories',
    component: TcategoryComponent,
    /* canActivate: [MsalGuard] */
  },
  {
    path: 'brands',
    component: MarkComponent,
    /* canActivate: [MsalGuard] */
  },
  {
    path: 'equipment-types',
    component: EquipmentTypeComponent    ,
    /* canActivate: [MsalGuard] */
  },
  {
    path: 'equipment-models',
    component: ModelsComponent    ,
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
