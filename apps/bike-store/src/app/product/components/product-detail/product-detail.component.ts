import { Component, OnInit, Output, EventEmitter, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ProductActions from '../../state/product.actions';
import { getCurrentProduct, getProductError, getCategories, getHttpRequestPending, getFormDirty } from '../../state';
import { ErrorType, State } from '../../state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product, Category } from '../../models';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  categories$: Observable<Category[]>;
  loading$: Observable<boolean>;
  formDirty$: Observable<boolean>;
  product: Product;
  errorMessage: string;
  selectedFiles: SelectedFile[] = [];

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    code: new FormControl('', [Validators.required, Validators.minLength(3)]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    rating: new FormControl(''),
    images: new FormControl(),
  });

  @Output() productChanged = new EventEmitter();

  @ViewChild('confirmDialog') confirmDialog: TemplateRef<any>;

  constructor(private _store: Store<State>, private _snackBar: MatSnackBar, private _dialog: MatDialog) {}

  ngOnInit(): void {
    this.formDirty$ = this._store.select(getFormDirty);
    this.loading$ = this._store.select(getHttpRequestPending);
    this._store.select(getCurrentProduct).subscribe((product) => {
      if (product) {
        this.product = product;
        this.selectedFiles = [];
        this.errorMessage = null;
        this.productForm.patchValue(product);
        this._store.dispatch(ProductActions.clearFormDirty());
        product.images.forEach((e) => this.selectedFiles.push((e as unknown) as SelectedFile));
      }
    });
    this._store.select(getProductError).subscribe((error: ErrorType) => {
      if (error) {
        this.showError(error);
      }
    });
    this.categories$ = this._store.select(getCategories);
    this.productForm.valueChanges
      .pipe(
        map(() => {
          return this.productForm.dirty && this.productForm.enabled;
        }),
      )
      .subscribe((dirty) => {
        if (dirty) {
          this._store.dispatch(ProductActions.setFormDirty());
        }
      });
  }

  saveProduct(): void {
    this.productForm.patchValue({
      images: this.selectedFiles,
    });
    this.product.id ? this.updateProduct() : this.addProduct();
  }

  zoomImage(image: SelectedFile) {}

  private addProduct(): void {
    this._store.dispatch(ProductActions.addProduct({ product: this.productForm.value }));
  }

  private updateProduct(): void {
    this._store.dispatch(ProductActions.updateProduct({ id: this.product.id, product: this.productForm.value }));
    // if (this.error === null) {
    //   this._snackBar.open('Product successfully updated', 'Close', { duration: 3000 });
    // }
    // this.clear();
  }

  deleteProduct(): void {
    const dialogRef = this._dialog.open(this.confirmDialog, { data: { product: this.product } });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this._store.dispatch(ProductActions.deleteProduct({ product: this.product }));
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

  private showError(error: ErrorType) {
    switch (error) {
      case ErrorType.ADD: {
        this.errorMessage = 'Error occurred while adding product';
        break;
      }
      case ErrorType.UPDATE: {
        this.errorMessage = 'Error occurred while updating product';
        break;
      }
      case ErrorType.DELETE: {
        this.errorMessage = 'Error occurred while deleting product';
        break;
      }
      default: {
        this.errorMessage = '';
        break;
      }
    }
  }

  private clear() {
    this._store.dispatch(ProductActions.clearCurrentProduct());
    this.productForm.reset();
    this.errorMessage = null;
    this.selectedFiles = [];
  }
}
