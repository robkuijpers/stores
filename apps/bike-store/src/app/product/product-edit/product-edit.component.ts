import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { State } from '../state/product.state';

@Component({
  selector: 'stores-product-edit-component',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  title = 'Product Edit';
  errorMessage = '';
  currentProduct: Product;

  constructor(
    private store: Store<State>,
    private productService: ProductService
  ) {}

  ngOnInit(): void {

  }

}
