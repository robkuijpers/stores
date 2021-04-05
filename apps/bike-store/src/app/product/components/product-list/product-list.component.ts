import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../models';
import { State } from '../../state';
import { getShowProductCode, getProducts, getProductsLoading } from '../../state';
import * as ProductActions from '../../state';
import * as CategoryActions from '../../state';

import { Observable } from 'rxjs';

@Component({
  selector: 'stores-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  showCode$: Observable<boolean>;
  loading$: Observable<boolean>;
  currentProduct: Product;
  errorMessage = '';
  products$: Observable<Product[]>;
  selectedProduct: Product;

  @ViewChildren('mat-list-item') items: QueryList<any>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
    this.store.dispatch(CategoryActions.loadCategories());
    this.products$ = this.store.select(getProducts);
    this.loading$ = this.store.select(getProductsLoading);
    this.showCode$ = this.store.select(getShowProductCode);
  }

  isSelected(product: Product) {
    return this.selectedProduct === product;
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initCurrentProduct());
  }

  selectProduct(product: Product): void {
    this.selectedProduct = product;
    this.store.dispatch(ProductActions.setCurrentProduct({ product }));
  }

  toggleCode(): void {
    this.store.dispatch(ProductActions.toggleProductCode());
  }
}
