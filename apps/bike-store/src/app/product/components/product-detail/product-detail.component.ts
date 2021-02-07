import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../models/product.model';
import { getCurrentProduct } from '../../state/product.selectors';
import { State } from '../../state/product.state';

@Component({
  selector: 'stores-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  title = 'Product details';
  errorMessage = '';
  currentProduct: Product;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.select(getCurrentProduct).subscribe((currentProduct) => (this.currentProduct = currentProduct));
  }
}
