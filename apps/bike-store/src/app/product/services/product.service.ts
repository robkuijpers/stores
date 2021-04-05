import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../src/environments/environment';
import { Product } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.productServiceBaseUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`).pipe(catchError(this.handleError));
  }

  addProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<Product>(`${this.baseUrl}/products`, product, { headers })
      .pipe(catchError(this.handleError));
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .put<Product>(`${this.baseUrl}/products/${id}`, product, { headers })
      .pipe(catchError(this.handleError));
  }

  deleteProduct(product: Product): Observable<number> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .delete<number>(`${this.baseUrl}/products/${product.id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Backend returned ${err.status}: ${err.statusText}`;
    }
    return throwError(errorMessage);
  }
}
