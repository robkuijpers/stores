import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@stores/material';
import { TranslateModule, TranslateLoader, TranslateService, TranslatePipe } from '@ngx-translate/core';
import { ComponentFixture, getTestBed, TestBed, waitForAsync } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthService } from 'apps/bike-store/src/app/auth/auth.service';

const translations = {
  header: {
    title: 'Dit is de titel',
  },
};
class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations);
  }
}

// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'translate'
// })
// export class TranslatePipeMock implements PipeTransform {
//   public name = 'translate';

//   public transform(query: string, ...args: any[]): any {
//     return query;
//   }
// }

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let debug: DebugElement;
  let native: any;
  let injector: Injector;
  let translateService: TranslateService;

  const authServiceMock = {
    isAuthenticated$: new BehaviorSubject<boolean>(false),
    checkAuthenticated: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          CommonModule,
          BrowserAnimationsModule,
          MaterialModule,
          RouterTestingModule.withRoutes([]),
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useValue: FakeLoader },
          }),
        ],
        declarations: [HeaderComponent],
        providers: [HeaderComponent, { provide: AuthService, useValue: authServiceMock }],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      debug = fixture.debugElement;
      native = fixture.debugElement.nativeElement;
      injector = getTestBed();
      translateService = injector.get(TranslateService);

      fixture.detectChanges();
      component.ngOnInit();
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should init with subscribtion to authService', () => {
    expect(component.isAuth).not.toBeNull();
  });

  fit('should invoke authService logout with root', async () => {
    const logOutspy = spyOn(authServiceMock, 'logout');
    await component.logout();
    expect(logOutspy).toHaveBeenCalledWith('/');
  });

  it('should include the title of the cards page', () => {
    //translateService.use('en');
    //fixture.detectChanges();
    //console.log('translate service:', translateService);

    const title = native.querySelector('[data-test="header-title"]');
    expect(title.textContent).toContain('header.title');
  });
});
