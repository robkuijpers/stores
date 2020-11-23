import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome';
import { LoginComponent } from './login';
import { MainComponent } from './main';
import { PageNotFoundComponent } from './page-not-found';
import { OktaCallbackComponent, OktaLoginRedirectComponent } from '@okta/okta-angular';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  // { path: 'login', component: LoginComponent },
  { path: 'login',  component: OktaLoginRedirectComponent },
  { path: 'implicit/callback', component: OktaCallbackComponent },
  { path: 'app', component: MainComponent, canActivate: [] },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
    canActivate: [],
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
