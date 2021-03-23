import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { ProductService } from '../services';
import * as ProductActions from './product.actions';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private productService: ProductService) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap(() =>
        this.productService.getProducts().pipe(map((products) => ProductActions.loadProductsSuccess({ products }))),
      ),
    );
  });

  saveProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.saveProduct),
      switchMap((action) => this.productService.saveProduct(action.product)),
      switchMap(() => [ProductActions.saveProductSuccess(), ProductActions.loadProducts()]),
    );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      switchMap((action) => this.productService.deleteProduct(action.product)),
      switchMap(() => [ProductActions.deleteProductSuccess(), ProductActions.loadProducts()]),
    );
  });
}
