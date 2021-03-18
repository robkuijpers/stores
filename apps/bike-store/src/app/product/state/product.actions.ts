import { createAction, props } from '@ngrx/store';
import { Product } from '../models';

export const loadProducts = createAction('[Product API] Load');
export const loadProductsSuccess = createAction('[Product API] Load Success', props<{ products: Product[] }>());
export const loadProductsFailure = createAction('[Product API] Load Failure');

export const toggleProductCode = createAction('[Product List Page] Toggle Product Code');

// 2e argument is a function with generic argument object that has a product property of type Product.
export const setCurrentProduct = createAction('[Product List Page] Set Curent Product', props<{ product: Product }>());
export const clearCurrentProduct = createAction('[Product Edit Page] Clear Curent Product');
export const initCurrentProduct = createAction('[Product Detail Page] Init Curent Product');

export const saveProduct = createAction('[Product Detail Page] Save Product', props<{ product: Product }>());
export const saveProductSuccess = createAction('[Product API] Save Success', props<{ product: Product }>());
export const saveProductFailure = createAction('[Product API] Save Failure');

export const deleteProduct = createAction('[Product Detail Page] Delete Product', props<{ product: Product }>());
export const deleteProductSuccess = createAction('[Product API] Delete Success');
export const deleteProductFailure = createAction('[Product API] Delete Failure');
