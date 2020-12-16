import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'stores-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;

  constructor(private oktaAuthService: OktaAuthService, private router: Router) {}

  ngOnInit(): void {
    this.oktaAuthService.$authenticationState.subscribe(
      (isAuthenticated: boolean) => (this.isAuthenticated = isAuthenticated),
    );
  }

  async logout() {
    const issuer = 'https://dev-1323293.okta.com/oauth2/default';
    const redirectUri = `${window.location.origin}/welcome`;

    // Read idToken before local session is cleared
    const idToken = await this.oktaAuthService.getIdToken();

    // Clear local session
    await this.oktaAuthService.signOut();

    // Clear remote session
    window.location.href = `${issuer}/v1/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${redirectUri}`;

    this.router.navigate(['/']);
  }
}
