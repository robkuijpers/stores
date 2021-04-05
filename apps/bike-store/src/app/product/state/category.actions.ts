import { createAction, props } from '@ngrx/store';
import { Category } from '../models';

export const loadCategories = createAction('[Category API] Load');
export const loadCategoriesSuccess = createAction('[Category API] Load Success', props<{ categories: Category[] }>());
export const loadCategoriesFailure = createAction('[Category API] Load Failure', props<{ error: any }>());
