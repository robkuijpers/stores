import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'stores-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Bike Store';
  isAuthenticated: boolean;
  userName: string;

  constructor(public oktaAuth: OktaAuthService, private translateService: TranslateService) {}

  ngOnInit() {
    this.initTranslateService();
  }

  async login() {}

  async logout() {}

  private initTranslateService() {
    this.translateService.addLangs(['nl', 'en']);
    this.translateService.setDefaultLang('nl');
    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang.match(/nl|en/) ? browserLang : 'nl');

    this.translateService.get('HELLO', { value: 'world' }).subscribe((res: string) => {
      console.log(res);
    });
  }
}
