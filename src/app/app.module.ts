import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpHeaders } from "@angular/common/http"; // Import 

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

import { MsalModule, MsalRedirectComponent, MsalGuard, MsalInterceptor } from '@azure/msal-angular'; // Import MsalInterceptor
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { UsersComponent } from './components/users/users.component';
/* import { TicketsComponent } from './components/tickets/tickets.component'; */
import { DevicesComponent } from './components/devices/devices.component';
import { LoginComponent } from './components/login/login.component';
import { MenuModule } from 'primeng/menu'; // add this import

import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';

import { FormsModule } from '@angular/forms';

import { SharedModule } from 'primeng/api';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';
import { Menubar, MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { TcategoryComponent } from './components/tcategory/tcategory.component';
import { TtypesComponent } from './components/ttypes/ttypes.component';
import { MarkComponent } from './components/mark/mark.component';
import { EquipmentTypeComponent } from './components/equipment-type/equipment-type.component';
import { ModelsComponent } from './components/models/models.component';
import { UserdetailComponent } from './components/userdetail/userdetail.component';
import { ChartModule } from 'primeng/chart';
import { TicketComponent } from './components/ticket/ticket.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { UserDeviceComponent } from './components/user-device/user-device.component';

import { AssignDeviceRecordsComponent } from './components/assign-device-records/assign-device-records.component';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    UsersComponent,
    DevicesComponent,
    LoginComponent,

    UserdetailComponent,
    DepartmentsComponent,
    TcategoryComponent,
    TtypesComponent,
    MarkComponent,
    EquipmentTypeComponent,
    ModelsComponent,
    TicketComponent,
    UserDeviceComponent,

    AssignDeviceRecordsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MenuModule,
    FormsModule,
    DynamicDialogModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    ToolbarModule,
    HttpClientModule,
    SharedModule,
    TooltipModule,
    TableModule,
    ChartModule,
    SliderModule,
    ConfirmDialogModule,
    DialogModule,
    CardModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    MenubarModule,
    ProgressBarModule,
    InputNumberModule,
    CalendarModule,
    MsalModule.forRoot(new PublicClientApplication({
      auth: {
        clientId: '30420230-c8c5-4cd1-8cd1-5da3658940e0', // This is your client ID
        authority: 'https://login.microsoftonline.com/47c8c642-c109-4c78-b5aa-4bece66d77bf',/* /'Enter_the_Tenant_Info_Here' */// This is your tenant ID
        redirectUri: 'https://localhost:4200/',// This is your redirect URI
        knownAuthorities: ['tcs246.b2clogin.com']
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE,
      }
    }), {
      interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: ['user.read']
      }
    }, {
      interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
      protectedResourceMap: new Map([
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
      ])
    })
  ],
  providers: [

    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }