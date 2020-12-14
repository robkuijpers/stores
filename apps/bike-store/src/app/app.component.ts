import { Component, OnInit } from '@angular/core'
import { OktaAuthService } from '@okta/okta-angular'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'stores-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Bike Store'
  isAuthenticated: boolean
  userName: string

  constructor(public oktaAuth: OktaAuthService, private translateService: TranslateService) {}

  ngOnInit() {
    this.initTranslateService()

    //  this.oktaAuth.$authenticationState.subscribe(
    //   (isAuthenticated) => {
    //     this.isAuthenticated = isAuthenticated;
    //   }
    // );
  }

  async login() {
    // // this.oktaAuth.signInWithRedirect({
    // //   originalUri: '/profile'
    // // });
    // this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    // if (this.isAuthenticated) {
    //   const userClaims = await this.oktaAuth.getUser();
    //   this.userName = userClaims.name;
    // }
  }

  async logout() {
    // const issuer = 'https://dev-1323293.okta.com/oauth2/default';
    // const redirectUri = `${window.location.origin}/welcome`;
    // // Read idToken before local session is cleared
    // const idToken = await this.oktaAuth.getIdToken();
    // // Clear local session
    // await this.oktaAuth.signOut('/');
    // // Clear remote session
    // window.location.href = `${issuer}/v1/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${redirectUri}`;
  }

  private initTranslateService() {
    this.translateService.addLangs(['nl', 'en'])
    this.translateService.setDefaultLang('nl')
    const browserLang = this.translateService.getBrowserLang()
    this.translateService.use(browserLang.match(/nl|en/) ? browserLang : 'nl')

    this.translateService.get('HELLO', { value: 'world' }).subscribe((res: string) => {
      console.log(res)
    })
  }
}
