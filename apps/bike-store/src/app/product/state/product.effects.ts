import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
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
      switchMap((action) =>
        this.productService.addProduct(action.product).pipe(
          switchMap(() => [ProductActions.addProductSuccess(), ProductActions.loadProducts()]),
          catchError((error) => of(ProductActions.addProductFailure(error))),
        ),
      ),
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      switchMap((action) =>
        this.productService.updateProduct(action.id, action.product).pipe(
          switchMap(() => [ProductActions.updateProductSuccess(), ProductActions.loadProducts()]),
          catchError((error) => of(ProductActions.updateProductFailure(error))),
        ),
      ),
    );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      switchMap((action) =>
        this.productService.deleteProduct(action.product).pipe(
          switchMap(() => [ProductActions.deleteProductSuccess(), ProductActions.loadProducts()]),
          catchError((error) => of(ProductActions.deleteProductFailure(error))),
        ),
      ),
    );
  });
}
