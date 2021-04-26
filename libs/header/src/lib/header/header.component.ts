import { Component, OnInit } from '@angular/core';
import { AuthService } from '@stores/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'stores-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuth: Observable<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuth = this.authService.isAuthenticated$.asObservable();
  }

  async logout(): Promise<void> {
    await this.authService.logout('/');
  }
}
