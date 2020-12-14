import { BrowserModule } from '@angular/platform-browser'
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'
import { MaterialModule } from '@stores/material'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { environment } from '../environments/environment'
import { HeaderModule } from '@stores/header'
import { ProductData } from './product/services'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { WelcomeComponent } from './welcome'
import { MainComponent } from './main'
import { LoginComponent } from './login'
import { PageNotFoundComponent } from './page-not-found'
import oktaConfig from './okta.config'
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular'

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json')
}

@NgModule({
  imports: [
    BrowserModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'nl',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(ProductData),
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
        },
      },
    ),
    EffectsModule.forRoot([]),
    HeaderModule,
    OktaAuthModule,
    AppRoutingModule,
    !environment.production
      ? StoreDevtoolsModule.instrument({
          name: 'Bike Store',
          maxAge: 25,
          logOnly: environment.production,
        })
      : [],
  ],
  declarations: [AppComponent, WelcomeComponent, MainComponent, LoginComponent, PageNotFoundComponent],
  exports: [MaterialModule],
  providers: [{ provide: OKTA_CONFIG, useValue: oktaConfig }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
