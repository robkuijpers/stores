import { ErrorType } from '.';
import { Category } from '../models';

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: ErrorType;
}
