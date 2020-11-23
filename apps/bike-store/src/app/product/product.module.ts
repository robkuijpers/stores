import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols'
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { productReducer } from './state/product.reducer';

const productRoutes: Routes = [
    { path: '', component: ProductListComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(productRoutes),
        StoreModule.forFeature('products', productReducer)  // create the products slice in the store
    ],
    declarations: [
        ProductListComponent,
        ProductEditComponent,
        ProductPageComponent,
    ],
    exports: [],
    providers: [],
    schemas: []
})
export class ProductModule {

    constructor() {}

}
