import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoryState } from '.';

const getCategoriesFeatureState = createFeatureSelector<CategoryState>('categories');

export const getCategories = createSelector(getCategoriesFeatureState, (state) => state.categories);
