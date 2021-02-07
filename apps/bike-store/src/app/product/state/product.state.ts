import * as AppState from '../../state/app.state';
import { Product } from '../models';

export interface State extends AppState.State {
  products: ProductState;
}

export interface ProductState {
  loading: boolean;
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}
