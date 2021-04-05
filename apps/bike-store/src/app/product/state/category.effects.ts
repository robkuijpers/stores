import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { CategoryService } from '../services';
import * as CategoryActions from './category.actions';

@Injectable()
export class CategoryEffects {
  constructor(private actions$: Actions, private categoryService: CategoryService) {}

  loadCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryActions.loadCategories),
      switchMap(() =>
        this.categoryService
          .getCategories()
          .pipe(map((categories) => CategoryActions.loadCategoriesSuccess({ categories }))),
      ),
    );
  });
}
