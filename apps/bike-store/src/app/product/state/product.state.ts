import * as AppState from '../../state/app.state';
import { Product } from '../models';

export interface State extends AppState.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
  loading: boolean;
  error: ErrorType;
}

export enum ErrorType {
  LOAD,
  ADD,
  UPDATE,
  DELETE,
}
