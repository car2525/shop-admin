import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ApiService } from 'src/app/core/api/api/api.service';
import { handleError } from 'src/app/core/redux/global.actions';
import { selectIdStore } from 'src/app/core/redux/global.selectors';

import { StatsCategories } from 'src/app/core/api/models/statsCategories';
import { getStatsCategoriesById, persistStatsCategories } from './statistics.actions';

@Injectable()
export class StatisticsEffects {
  constructor(private readonly actions$: Actions, private readonly store: Store, private readonly apiService: ApiService) { }

  getStatsCategoriesById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getStatsCategoriesById),
      withLatestFrom(this.store.select(selectIdStore)),
      switchMap(([_, idStore]) =>
        this.apiService.getStatsCategories(idStore).pipe(
          map((statsCategories: StatsCategories[]) => persistStatsCategories({ statsCategories })),
          catchError((_) =>
            of(handleError(
              {
                errorMsg: 'Errore nel recupero delle statistiche'
              }
            )
            ))
        )
      )
    )
  );
}
