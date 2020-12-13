import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { OktaAuthService } from '@okta/okta-angular'

@Component({
  selector: 'stores-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isAuthenticated = false

  constructor(private oktaAuthService: OktaAuthService, private router: Router) {}

  ngOnInit(): void {
    this.oktaAuthService.$authenticationState.subscribe(
      (isAuthenticated: boolean) => (this.isAuthenticated = isAuthenticated),
    )
  }

  public login(): void {
    console.log('login')
  }

  public logout(): void {
    console.log('logout')
  }
}
