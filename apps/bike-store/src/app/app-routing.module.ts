import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome';
import { PageNotFoundComponent } from './page-not-found';
// import { ProductModule } from './product/product.module';

const appRoutes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'product',
    loadChildren: () =>
      import('./product/product.module').then(m => m.ProductModule)
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
