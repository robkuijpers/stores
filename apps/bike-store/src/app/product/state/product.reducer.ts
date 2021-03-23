import { on, createReducer } from '@ngrx/store';
import { ProductState } from './product.state';
import * as ProductActions from './product.actions';

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: [],
  loading: false,
  error: null,
};

// pure function: same input = same output with no side effects
export const productReducer = createReducer<ProductState>(
  initialState,
  on(ProductActions.toggleProductCode, (state: ProductState) => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),
  on(
    ProductActions.setCurrentProduct,
    (state, action): ProductState => {
      return {
        ...state,
        currentProduct: action.product,
      };
    },
  ),
  on(
    ProductActions.clearCurrentProduct,
    (state): ProductState => {
      return {
        ...state,
        currentProduct: null,
      };
    },
  ),
  on(
    ProductActions.initCurrentProduct,
    (state): ProductState => {
      return {
        ...state,
        currentProduct: {
          id: 0,
          name: 'New',
          category: '',
          code: '',
          description: '',
          rating: null,
        },
      };
    },
  ),
  on(
    ProductActions.loadProducts,
    (state): ProductState => {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
  ),
  on(
    ProductActions.loadProductsSuccess,
    (state, action): ProductState => {
      return {
        ...state,
        products: action.products,
        loading: false,
        error: null,
      };
    },
  ),
  on(
    ProductActions.loadProductsFailure,
    (state): ProductState => {
      return {
        ...state,
        products: [],
        loading: false,
        error: 'error',
      };
    },
  ),
  on(
    ProductActions.deleteProduct,
    (state): ProductState => {
      return {
        ...state,
        loading: true,
      };
    },
  ),
  on(
    ProductActions.deleteProductSuccess,
    (state): ProductState => {
      return {
        ...state,
        loading: false,
        error: null,
      };
    },
  ),
  on(
    ProductActions.deleteProductFailure,
    (state): ProductState => {
      return {
        ...state,
        loading: false,
        error: 'error',
      };
    },
  ),
  on(
    ProductActions.saveProduct,
    (state): ProductState => {
      return {
        ...state,
        loading: true,
      };
    },
  ),
  on(
    ProductActions.saveProductSuccess,
    (state): ProductState => {
      return {
        ...state,
        loading: false,
        error: null,
      };
    },
  ),
  on(
    ProductActions.saveProductFailure,
    (state): ProductState => {
      return {
        ...state,
        loading: false,
        error: 'error',
      };
    },
  ),
);
