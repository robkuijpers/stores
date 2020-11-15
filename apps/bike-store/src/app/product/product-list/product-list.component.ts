import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
    selector: 'stores-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

    title = 'Product List';
    products: Product[];
    displayCode: true;
    errorMessage:'';

    constructor(
        private store: Store<any>,
        private productService: ProductService) { }

    ngOnInit(): void {
        this.productService.getProducts().subscribe({
            next: (products: Product[]) => this.products = products,
            error: err => this.errorMessage = err.error
          });
    }

    checkChanged(e: Event): void {
        this.store.dispatch({
            type: '[Product] Toggle Product Code'
        });
    }

    ngOnDestroy(): void {

    }

}
