import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductListComponent } from './components';
import { ProductDetailComponent } from './components';
import { productReducer } from './state/product.reducer';
import { ProductEffects } from './state/product.effects';

const productRoutes: Routes = [{ path: '', component: ProductPageComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productRoutes),
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature([ProductEffects]),
  ],
  declarations: [ProductDetailComponent, ProductListComponent, ProductPageComponent],
  exports: [],
  providers: [],
  schemas: [],
})
export class ProductModule {
  constructor() {}
}
