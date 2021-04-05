import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@stores/material';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductListComponent } from './components';
import { ProductDetailComponent } from './components';
import { ConfirmationComponent } from './components';
import { productReducer } from './state/product.reducer';
import { categoryReducer } from './state/category.reducer';
import { ProductEffects } from './state/';
import { CategoryEffects } from './state';

const productRoutes: Routes = [{ path: '', component: ProductPageComponent }];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(productRoutes),
    StoreModule.forFeature('products', productReducer),
    StoreModule.forFeature('categories', categoryReducer),
    EffectsModule.forFeature([ProductEffects, CategoryEffects]),
  ],
  declarations: [ProductDetailComponent, ProductListComponent, ProductPageComponent, ConfirmationComponent],
  exports: [],
  providers: [],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductModule {
  constructor() {}
}
