import { Component, OnInit, Output, EventEmitter, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ProductActions from '../../state/product.actions';
import { getCurrentProduct } from '../../state/product.selectors';
import { State } from '../../state/product.state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../models';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'stores-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  errorMessage = '';
  product: Product;
  selectedFiles: string[] = [];

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
  }

  saveProduct(): void {
    this.product.id ? this.updateProduct() : this.addProduct();
  }

  private addProduct(): void {
    this._store.dispatch(ProductActions.addProduct({ product: this.productForm.value }));
    this._snackBar.open('Product successfully added', 'Close', { duration: 3000 });
    this.clear();
  }

  private updateProduct(): void {
    this._store.dispatch(ProductActions.updateProduct({ id: this.product.id, product: this.productForm.value }));
    this._snackBar.open('Product successfully updated', 'Close', { duration: 3000 });
    this.clear();
  }

  deleteProduct(): void {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.data = {
    //   product: this.product
    // }
    // const dialogRef: MatDialogRef<ConfirmationComponent> = this._dialog.open(ConfirmationComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe((data) => {
    //   if (data) {
    //     this._store.dispatch(ProductActions.deleteProduct({ product: this.product }));
    //     this._snackBar.open('Product successfully deleted', 'Close', { duration: 3000 });
    //     this.clear();
    //   }
    // });

    const dialogRef = this._dialog.open(this.confirmDialog, { data: { produt: this.product } });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this._store.dispatch(ProductActions.deleteProduct({ product: this.product }));
        this._snackBar.open('Product successfully deleted', 'Close', { duration: 3000 });
        this.clear();
      }
    });
  }

  fileChangeEvent(evt: Event): void {
    const target: HTMLInputElement = evt.target as HTMLInputElement;
    if (target.files && target.files.length) {
      Array.from(target.files).forEach((file: File) => {
        this.selectedFiles.push(file.name + ' (' + Math.trunc(file.size / 1000) + 'kb)');
      });

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent) => {
        const image = new Image();
        image.src = (e.target as FileReader).result as string;
        image.onload = (rs) => {
          // Return Base64 Data URL
          const imgBase64Path = (e.target as FileReader).result;
        };
      };
      reader.readAsDataURL(target.files[0]);
    }
  }

  removeUploadFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  private clear() {
    this._store.dispatch(ProductActions.clearCurrentProduct());
    this.productForm.reset();
  }
}
