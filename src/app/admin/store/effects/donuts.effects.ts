import { Injectable } from '@angular/core';

import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as fromRoot from '../../../store';
import * as donutActions from '../actions/donuts.action';
import * as fromServices from '../../services';

@Injectable()
export class DonutsEffects {
  constructor(
    private actions$: Actions,
    private donutService: fromServices.DonutService
  ) {}

  loadPizzas$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(donutActions.LOAD_DONUTS),
      switchMap(() => {
        return this.donutService.read().pipe(
          map((donuts) => new donutActions.LoadDonutsSuccess(donuts)),
          catchError((error) => of(new donutActions.LoadDonutsFailure(error)))
        );
      })
    );
  });

  createDonut$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(donutActions.CREATE_DONUT),
      map((action: donutActions.CreateDonut) => action.payload),
      switchMap((donut) => {
        return this.donutService.create(donut).pipe(
          map((donut) => new donutActions.CreateDonutSuccess(donut)),
          catchError((error) => of(new donutActions.CreateDonutFailure(error)))
        );
      })
    );
  });

  createDonutSuccess$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(donutActions.CREATE_DONUT_SUCCESS),
      map((action: donutActions.CreateDonutSuccess) => action.payload),
      map((donut) => {
        return new fromRoot.Go({
          path: ['/admin', donut.id],
        });
      })
    );
  });

  updateDonut$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(donutActions.UPDATE_DONUT),
      map((action: donutActions.UpdateDonut) => action.payload),
      switchMap((donut) => {
        return this.donutService.update(donut).pipe(
          map((donut) => new donutActions.UpdateDonutSuccess(donut)),
          catchError((error) => of(new donutActions.UpdateDonutFailure(error)))
        );
      })
    );
  });

  removePizza$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(donutActions.REMOVE_DONUT),
      map((action: donutActions.RemoveDonut) => action.payload),
      switchMap((donut) => {
        return this.donutService.delete(donut).pipe(
          map(() => new donutActions.RemoveDonutSuccess(donut)),
          catchError((error) => of(new donutActions.RemoveDonutFailure(error)))
        );
      })
    );
  });

  handleDonutSuccess$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(
        donutActions.UPDATE_DONUT_SUCCESS,
        donutActions.REMOVE_DONUT_SUCCESS
      ),
      map((donut) => {
        return new fromRoot.Go({
          path: ['/admin/donuts'],
        });
      })
    );
  });
}
