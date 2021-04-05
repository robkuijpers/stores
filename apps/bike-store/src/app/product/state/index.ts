import * as AppState from '../../state/app.state';

import { CategoryState } from './category.state';
import { ProductState } from './product.state';

export * from './product.state';
export * from './product.actions';
export * from './product.effects';
export * from './product.selectors';

export * from './category.state';
export * from './category.actions';
export * from './category.effects';
export * from './category.selectors';

export interface State extends AppState.State {
  products: ProductState;
  categories: CategoryState;
}

export enum ErrorType {
  LOAD,
  ADD,
  UPDATE,
  DELETE,
}
