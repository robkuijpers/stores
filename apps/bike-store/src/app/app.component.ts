import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'stores-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'Bike Store';
  isAuthenticated: boolean;
  userName: string;

  constructor(public oktaAuth: OktaAuthService) { }

  ngOnInit() {
     this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
         //const userClaims = await this.oktaAuth.getUser();
         //this.userName = userClaims.name;
      }
    );
  }

  async login() {
    // this.oktaAuth.signInWithRedirect({
    //   originalUri: '/profile'
    // });
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (this.isAuthenticated) {
      const userClaims = await this.oktaAuth.getUser();
      this.userName = userClaims.name;
    }
  }

  async logout() {
      const issuer = 'https://dev-1323293.okta.com/oauth2/default';
      const redirectUri = `${window.location.origin}/welcome`;

      // Read idToken before local session is cleared
      const idToken = await this.oktaAuth.getIdToken();

      // Clear local session
      await this.oktaAuth.signOut('/');

      // Clear remote session
      window.location.href = `${issuer}/v1/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${redirectUri}`;

    // this.oktaAuth.signOut();
  }

}
