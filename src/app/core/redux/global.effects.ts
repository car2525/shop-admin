import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { catchError, map, of, switchMap, take, tap } from 'rxjs';
import { Store as StoreModel } from 'src/app/core/api/models/store';
import { ApiService } from '../api/api/api.service';
import { handleError, operationSuccess, persistStore, persistStoreId } from './global.actions';

@Injectable()
export class GlobalEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly messageService: MessageService,
    private readonly apiService: ApiService
  ) {}

  showErrorMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(handleError),
        tap(({ errorMsg }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Errore',
            detail: errorMsg,
          });
        })
      ),
    { dispatch: false }
  );

  showSuccessMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(operationSuccess),
        tap(({ message }) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successo',
            detail: message,
          });
        })
      ),
    { dispatch: false }
  );

  // Effetto per ottenere un negozio tramite ID
  getStoreById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(persistStoreId),
      take(1),
      switchMap((action) =>
        this.apiService.getStoresIdStore(action.idStore).pipe(
          map((store: StoreModel) => persistStore({ store })),
          catchError((_) =>
            of(handleError(
              {
                errorMsg: 'Errore nel recupero delle informazioni sul negozio'
              }
            )
            ))
        )
      )
    )
  );

}
