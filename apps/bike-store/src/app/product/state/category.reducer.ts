import { on, createReducer } from '@ngrx/store';
import { CategoryState } from './category.state';
import * as CategoryActions from './category.actions';
import { ErrorType } from '.';

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

// pure function: same input = same output with no side effects
export const categoryReducer = createReducer<CategoryState>(
  initialState,
  on(
    CategoryActions.loadCategories,
    (state: CategoryState): CategoryState => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
  ),
  on(
    CategoryActions.loadCategoriesSuccess,
    (state: CategoryState, action): CategoryState => {
      return {
        ...state,
        categories: action.categories,
        loading: false,
        error: null,
      };
    },
  ),
  on(
    CategoryActions.loadCategoriesFailure,
    (state: CategoryState): CategoryState => {
      return {
        ...state,
        categories: [],
        loading: false,
        error: ErrorType.LOAD,
      };
    },
  ),
);
