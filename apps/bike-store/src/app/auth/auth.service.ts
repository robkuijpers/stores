import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { OktaAuth } from '@okta/okta-auth-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static oktaDomain = 'dev-1323293.okta.com';
  static clientId = '0oa1l81o6ey7TqHyK5d6';

  private oktaAuthClient = new OktaAuth({
    issuer: environment.okta.issuer,
    clientId: environment.okta.clientId,
  });

  public isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {}

  async checkAuthenticated(): Promise<boolean> {
    const authenticated = await this.oktaAuthClient.session.exists();
    this.isAuthenticated.next(authenticated);
    return authenticated;
  }

  async login(username: string, password: string) {
    const transaction = await this.oktaAuthClient.signIn({ username, password });

    if (transaction.status !== 'SUCCESS') {
      throw Error('We cannot handle the ' + transaction.status + ' status');
    }
    this.isAuthenticated.next(true);
    this.oktaAuthClient.session.setCookieAndRedirect(transaction.sessionToken);
  }

  async logout(redirect: string) {
    try {
      await this.oktaAuthClient.signOut();
      this.isAuthenticated.next(false);
      this.router.navigate([redirect]);
    } catch (err) {
      console.error(err);
    }
  }
}
