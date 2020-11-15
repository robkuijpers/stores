import { state } from '@angular/animations';
import { createAction, on, createReducer } from '@ngrx/store';

// pure function: same input = same output with no side effects
export const productReducer = createReducer(
    { showProductCode: true },
    on(createAction('[Product] Toggle Product Code'), state => {
        return {
            ...state,
            showProductCode: !state.showProductCode
        }
    })
)
