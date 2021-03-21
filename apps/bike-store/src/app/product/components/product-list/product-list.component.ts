import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../models/product.model';
import { State } from '../../state/product.state';
import { getShowProductCode, getProducts, getProductsLoading } from '../../state/product.selectors';
import * as ProductActions from '../../state/product.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'stores-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  //products: Product[] = [];
  showCode$: Observable<boolean>;
  loading$: Observable<boolean>;
  currentProduct: Product;
  errorMessage = '';
  products$: Observable<Product[]>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
    this.products$ = this.store.select(getProducts);
    this.loading$ = this.store.select(getProductsLoading);
    this.showCode$ = this.store.select(getShowProductCode);
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initCurrentProduct());
  }

  selectProduct(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({ product }));
  }

  toggleCode(): void {
    this.store.dispatch(ProductActions.toggleProductCode());
  }
}
