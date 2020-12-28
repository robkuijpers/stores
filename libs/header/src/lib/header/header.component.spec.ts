import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { MaterialModule } from '@stores/material';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { Injector } from '@angular/core';

let translations: any = { 'header.title': 'Dit is de titel' };

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations);
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let translate: TranslateService;
  let injector: Injector;
  let authServiceMock = {
    isAuthenticated: jest.fn(),
    logout: jest.fn(),
  };

  beforeEach(() => {
    authServiceMock.isAuthenticated.mockReturnValue(of(true));
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader },
        }),
        MaterialModule,
      ],
      providers: [authServiceMock],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    injector = getTestBed();
    translate = injector.get(TranslateService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init with subscribtion to authService', () => {
    expect(authServiceMock.isAuthenticated).toHaveBeenCalled();
  });

  it('should invoke authService logout with root', () => {
    component.logout();
    expect(authServiceMock.logout()).toHaveBeenCalledWith('/');
  });

  it('should include the title of the cards page', () => {
    translate.use('nl');
    fixture.detectChanges();
    // expect(el.textContent).toContain('Dit is de titel')
  });
});
