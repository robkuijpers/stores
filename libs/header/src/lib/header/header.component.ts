import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'apps/bike-store/src/app/auth/auth.service';

@Component({
  selector: 'stores-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe((isAuthenticated: boolean) => (this.isAuthenticated = isAuthenticated));
  }

  logout(): void {
    this.authService.logout('/');
  }
}
