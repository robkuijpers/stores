import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../services';
import * as ProductActions from './product.actions';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private productService: ProductService) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(map((products) => ProductActions.loadProductsSuccess({ products }))),
      ),
    );
  });

  saveProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.saveProduct),
      mergeMap((action) =>
        this.productService
          .saveProduct(action.product)
          .pipe(map((product) => ProductActions.saveProductSuccess({ product }))),
      ),
    );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      mergeMap((action) =>
        this.productService.deleteProduct(action.product).pipe(map(() => ProductActions.deleteProductSuccess())),
      ),
    );
  });
}
