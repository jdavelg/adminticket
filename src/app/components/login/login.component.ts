import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'msal-angular-tutorial';
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration, private broadcastService: MsalBroadcastService, private authService: MsalService) { }

  ngOnInit() {
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
    if (this.msalGuardConfig.authRequest){
      
     
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
    
    } else {
    
      this.authService.loginRedirect();
    }
  }
  logout() { // Add log out function here
    this.authService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200'
    });
  }
  
  setLoginDisplay() {
   
    if (this.authService.instance.getAllAccounts().length > 0) {
      let mail=this.authService.instance.getAllAccounts()[0].username
      let mailArr = mail.split('@', 2)
      if (mailArr[1] == 'tcs246.com') {
this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
      console.log('data logueado', this.authService.instance.getAllAccounts());
   /* SE DEBE HACER REQUEST PARA SABER SI ES ADMIN */

      }else{
        this.authService.logout()
      }
    }
    
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
