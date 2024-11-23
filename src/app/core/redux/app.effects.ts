import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { handleError, operationSuccess } from './app.actions';
import { tap } from 'rxjs';

@Injectable()
export class AppEffects {
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
