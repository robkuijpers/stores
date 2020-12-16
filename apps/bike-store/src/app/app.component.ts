import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'stores-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.initTranslateService();
  }

  private initTranslateService() {
    this.translateService.addLangs(['nl', 'en']);
    this.translateService.setDefaultLang('nl');
    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang.match(/nl|en/) ? browserLang : 'nl');
  }
}
