import { Component, OnInit, Output, EventEmitter, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ProductActions from '../../state/product.actions';
import { getCurrentProduct, getProductError } from '../../state/product.selectors';
import { State } from '../../state/product.state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../models';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { Observable } from 'rxjs';

export interface SelectedFile {
  name: string;
  type: string;
  size: number;
  base64: string;
}
@Component({
  selector: 'stores-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  errorMessage = '';
  product: Product;
  error: string;
  selectedFiles: SelectedFile[] = [];
  currentProduct$: Observable<Product>;

  @Output() productChanged = new EventEmitter();

  @ViewChild('confirmDialog') confirmDialog: TemplateRef<any>;
  @ViewChild('uploadFileInput') fileUploadInput: ElementRef<any>;

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    code: new FormControl('', [Validators.required, Validators.minLength(3)]),
    category: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl(''),
    rating: new FormControl(''),
    images: new FormControl(),
  });

  constructor(private _store: Store<State>, private _snackBar: MatSnackBar, private _dialog: MatDialog) {}

  ngOnInit(): void {
    this._store.select(getCurrentProduct).subscribe((product) => {
      this.product = product;
      this.productForm.patchValue(product);
    });
    this._store.select(getProductError).subscribe((error) => {
      this.error = error;
    });
    this.currentProduct$ = this._store.select(getCurrentProduct);
  }

  saveProduct(): void {
    this.product.id ? this.updateProduct() : this.addProduct();
  }

  private addProduct(): void {
    this._store.dispatch(ProductActions.addProduct({ product: this.productForm.value }));
    if (this.error === null) {
      this._snackBar.open('Product successfully added', 'Close', { duration: 3000 });
    }
    this.clear();
  }

  private updateProduct(): void {
    this._store.dispatch(ProductActions.updateProduct({ id: this.product.id, product: this.productForm.value }));
    if (this.error === null) {
      this._snackBar.open('Product successfully updated', 'Close', { duration: 3000 });
    }
    this.clear();
  }

  deleteProduct(): void {
    const dialogRef = this._dialog.open(this.confirmDialog, { data: { produt: this.product } });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this._store.dispatch(ProductActions.deleteProduct({ product: this.product }));
        if (this.error === null) {
          this._snackBar.open('Product successfully deleted', 'Close', { duration: 3000 });
        }
        this.clear();
      }
    });
  }

  fileChangeEvent(evt: Event): void {
    const target: HTMLInputElement = evt.target as HTMLInputElement;
    if (target.files && target.files.length) {
      Array.from(target.files).forEach(async (file: File) => {
        const base64Str = await this.readFileBase64(file);
        const f = {
          name: file.name,
          type: file.type,
          size: Math.trunc(file.size / 1000),
          base64: base64Str,
        } as SelectedFile;
        this.selectedFiles.push(f);
      });
    }
  }

  removeUploadFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  private readFileBase64 = async (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        function () {
          const base64 = reader.result;
          resolve(base64);
        },
        false,
      );
      reader.readAsDataURL(file);
    });
  };

  private clear() {
    this._store.dispatch(ProductActions.clearCurrentProduct());
    this.productForm.reset();
  }
}
