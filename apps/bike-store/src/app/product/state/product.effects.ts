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

  addProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.addProduct),
      switchMap((action) => this.productService.addProduct(action.product)),
      switchMap(() => [ProductActions.addProductSuccess(), ProductActions.loadProducts()]),
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      switchMap((action) => this.productService.updateProduct(action.id, action.product)),
      switchMap(() => [ProductActions.updateProductSuccess(), ProductActions.loadProducts()]),
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
