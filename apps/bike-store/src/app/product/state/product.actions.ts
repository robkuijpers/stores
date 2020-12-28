import { createAction, props } from '@ngrx/store';
import { Product } from '../models';

export const loadProducts = createAction('[Product API] Load');
export const loadProductsSuccess = createAction('[Product API] Load Success', props<{ products: Product[] }>());
export const loadProductsFailure = createAction('[Product API] Load Failure');

export const toggleProductCode = createAction('[Product List Page] Toggle Product Code');

// 2e argument is a function with generic argument object that has a product property of type Product.
export const setCurrentProduct = createAction('[Product List Page] Set Curent Product', props<{ product: Product }>());
export const clearCurrentProduct = createAction('[Product Edit Page] Set Curent Product');
export const initCurrentProduct = createAction('[Product List Page] Set Curent Product');
