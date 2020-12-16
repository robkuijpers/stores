import { Component, OnDestroy, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit, OnDestroy {
  isAuthenticated = false;

  constructor(private oktaAuth: OktaAuthService) {}

  ngOnInit(): void {
    // this.oktaAuth
    //   .isAuthenticated()
    //   .then((auth) => {
    //     this.isAuthenticated = auth;
    //   })
    //   .catch((err) => {
    //     console.log('Error');
    //   });

    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => (this.isAuthenticated = isAuthenticated),
    );
  }

  async logout() {
    const issuer = 'https://dev-1323293.okta.com/oauth2/default';
    const redirectUri = `${window.location.origin}/welcome`;

    // Read idToken before local session is cleared
    const idToken = await this.oktaAuth.getIdToken();

    // Clear local session
    await this.oktaAuth.signOut();

    // Clear remote session
    window.location.href = `${issuer}/v1/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${redirectUri}`;
  }

  ngOnDestroy(): void {}
}
