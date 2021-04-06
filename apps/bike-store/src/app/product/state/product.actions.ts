import { createAction, props } from '@ngrx/store';
import { Product } from '../models';

export const toggleProductCode = createAction('[Product List Page] Toggle Product Code');

export const loadProducts = createAction('[Product API] Load');
export const loadProductsSuccess = createAction('[Product API] Load Success', props<{ products: Product[] }>());
export const loadProductsFailure = createAction('[Product API] Load Failure', props<{ error: any }>());

export const searchProduct = createAction('[Product List Page] Search Product', props<{ term: string }>());

export const setCurrentProduct = createAction('[Product List Page] Set Curent Product', props<{ product: Product }>());
export const clearCurrentProduct = createAction('[Product Edit Page] Clear Curent Product');
export const initCurrentProduct = createAction('[Product Detail Page] Init Curent Product');

export const addProduct = createAction('[Product Detail Page] Add Product', props<{ product: Product }>());
export const addProductSuccess = createAction('[Product API] Add Success');
export const addProductFailure = createAction('[Product API] Add Failure', props<{ error: any }>());

export const updateProduct = createAction(
  '[Product Detail Page] Update Product',
  props<{ id: string; product: Product }>(),
);
export const updateProductSuccess = createAction('[Product API] Update Success');
export const updateProductFailure = createAction('[Product API] Update Failure', props<{ error: any }>());

export const deleteProduct = createAction('[Product Detail Page] Delete Product', props<{ product: Product }>());
export const deleteProductSuccess = createAction('[Product API] Delete Success');
export const deleteProductFailure = createAction('[Product API] Delete Failure', props<{ error: any }>());

export const setFormDirty = createAction('[Product API] Set Form Dirty');
export const clearFormDirty = createAction('[Product API] Clear Form Dirty');
