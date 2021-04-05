import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../models';

@Component({
  selector: 'stores-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {
  product: Product;

  constructor(private dialogRef: MatDialogRef<ConfirmationComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.product = data.product;
  }

  close() {
    this.dialogRef.close();
  }
}
