import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ProductActions from '../../state/product.actions';
import { getCurrentProduct } from '../../state/product.selectors';
import { State } from '../../state/product.state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../models';

@Component({
  selector: 'stores-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  errorMessage = '';
  product: Product;

  @Output() productChanged = new EventEmitter();

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    code: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(private _store: Store<State>, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this._store.select(getCurrentProduct).subscribe((product) => {
      this.product = product;
      this.productForm.patchValue(product);
    });
  }

  saveProduct(): void {
    this._store.dispatch(ProductActions.saveProduct({ product: this.productForm.value }));
    this._store.dispatch(ProductActions.clearCurrentProduct());
    this._snackBar.open('Product successfully updated', 'Close', { duration: 3000 });
    this.productForm.reset();
  }

  deleteProduct(): void {
    this._store.dispatch(ProductActions.deleteProduct({ product: this.product }));
    this._store.dispatch(ProductActions.clearCurrentProduct());
    this._snackBar.open('Product successfully deleted', 'Close', { duration: 3000 });
    this.productForm.reset();
  }
}
