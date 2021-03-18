import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import * as ProductActions from '../../state/product.actions';
import { getCurrentProduct } from '../../state/product.selectors';
import { State } from '../../state/product.state';

@Component({
  selector: 'stores-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  errorMessage = '';
  productSelected = false;

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    code: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store
      .select(getCurrentProduct)
      .pipe(
        tap((product) => {
          this.productForm.patchValue(product);
          this.productSelected = true;
        }),
      )
      .subscribe();
  }

  saveProduct(): void {
    this.store.dispatch(ProductActions.saveProduct(this.productForm.value()));
    // clear form
    // product selected false
  }

  deleteProduct(): void {
    this.store.dispatch(ProductActions.deleteProduct(this.productForm.value()));
    // clear form
    // product selected false
  }
}
