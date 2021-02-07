import { on, createReducer } from '@ngrx/store';
import { ProductState } from './product.state';
import * as ProductActions from './product.actions';

const initialState: ProductState = {
  loading: false,
  showProductCode: true,
  currentProduct: null,
  products: [],
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
    (state, action): ProductState => {
      return {
        ...state,
        loading: true,
      };
    },
  ),
  on(
    ProductActions.loadProductsSuccess,
    (state, action): ProductState => {
      return {
        ...state,
        loading: false,
        products: action.products,
      };
    },
  ),
  on(
    ProductActions.loadProductsFailure,
    (state): ProductState => {
      return {
        ...state,
        loading: false,
        products: [],
      };
    },
  ),
);
