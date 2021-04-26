import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.state';

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(getProductFeatureState, (state) => state.showProductCode);

export const getHttpRequestPending = createSelector(getProductFeatureState, (state) => state.loading);

export const getCurrentProduct = createSelector(getProductFeatureState, (state) => state.currentProduct);

export const getProducts = createSelector(getProductFeatureState, (state) => state.products);

export const getProductError = createSelector(getProductFeatureState, (state) => state.error);

export const getFormDirty = createSelector(getProductFeatureState, (state) => state.dirty);
