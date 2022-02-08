import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ConfirmationService]
})
export class AppComponent implements OnInit, OnDestroy {
  items: MenuItem[];
  title = 'msal-angular-tutorial';
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration, private broadcastService: MsalBroadcastService, private authService: MsalService) { }

  ngOnInit() {
    this.items = [
      {
        label: 'usuarios',
        icon: 'pi pi-fw pi-user',
        items: [{
          label: 'Departamentos',
          icon: 'pi pi-fw pi-plus',
          routerLink: ['/departments'],

        },
        {
          label: 'Usuarios gestion',
          icon: 'pi pi-fw pi-tags',
          routerLink: ['/users'],
        },

        ],

      },
      {
        label: 'Inventario',
        icon: 'pi pi-fw pi-print',
        items: [
          {
            label: 'Modelos', icon: 'pi pi-fw pi-trash',
            routerLink: ['/equipment-models'],
          },
          {
            label: 'Marcas', icon: 'pi pi-fw pi-refresh',
            routerLink: ['/brands'],
          },
          {
            label: 'Tipos de equipo', icon: 'pi pi-fw pi-refresh',
            routerLink: ['/equipment-types'],
          }
        ]

      },
      {
        label: 'Tickets',
        icon: 'pi pi-fw pi-ticket',
        items: [
          {
            label: 'Categorias', icon: 'pi pi-fw pi-refresh',
            routerLink: ['/ticket-categories'],
          },
          {
            label: 'Tipos', icon: 'pi pi-fw pi-refresh',
            routerLink: ['/ticket-types'],
          },
          {
            label: 'Tickets', icon: 'pi pi-fw pi-refresh',
            routerLink: ['/tickets'],
          },

        ]
      }
    ];

    this.isIframe = window !== window.parent && !window.opener;

    this.broadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      })


  }

  login() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }
  logout() { // Add log out function here
    this.authService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200'
    });
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}