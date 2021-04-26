import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { OktaAuth, OktaAuthOptions } from '@okta/okta-auth-js';
import { OKTA_CONFIG } from '@okta/okta-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private oktaAuthClient: OktaAuth;

  public isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, @Inject(OKTA_CONFIG) oktaOptions: OktaAuthOptions) {
    this.oktaAuthClient = new OktaAuth(oktaOptions);
  }

  async checkAuthenticated(): Promise<boolean> {
    const authenticated = await this.oktaAuthClient.session.exists();
    this.isAuthenticated$.next(authenticated);
    return authenticated;
  }

  async login(username: string, password: string): Promise<void> {
    const transaction = await this.oktaAuthClient.signIn({ username, password });

    if (transaction.status !== 'SUCCESS') {
      throw Error('We cannot handle the ' + transaction.status + ' status');
    }
    this.isAuthenticated$.next(true);
    this.oktaAuthClient.session.setCookieAndRedirect(transaction.sessionToken);
  }

  async logout(redirect: string): Promise<void> {
    try {
      await this.oktaAuthClient.signOut();
      this.isAuthenticated$.next(false);
      this.router.navigate([redirect]);
    } catch (err) {
      console.error(err);
    }
  }
}
