import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { handleError, operationSuccess } from './global.actions';
import { tap } from 'rxjs';

@Injectable()
export class GlobalEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly messageService: MessageService
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

}
