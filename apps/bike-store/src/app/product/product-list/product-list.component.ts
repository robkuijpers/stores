import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { State } from '../state/product.state';
import { getShowProductCode, getCurrentProduct } from '../state/product.selectors';
import * as ProductActions from '../state/product.actions';

@Component({
  selector: 'stores-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  title = 'Product List';
  products: Product[] = [];
  displayCode = true;
  errorMessage = '';
  currentProduct: Product;

  constructor(private store: Store<State>, private productService: ProductService) {}

  ngOnInit(): void {
    this.store.select(getCurrentProduct).subscribe((currentProduct) => (this.currentProduct = currentProduct));

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => (this.products = products),
      error: (err) => (this.errorMessage = err.error),
    });
    this.store.select(getShowProductCode).subscribe((showProductCode) => (this.displayCode = showProductCode));
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({ product }));
  }

  checkChanged(e: Event): void {
    this.store.dispatch(ProductActions.toggleProductCode());
  }
}
