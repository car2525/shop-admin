import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MessageService } from 'primeng/api';
import { Observable, of } from 'rxjs';
import { handleError, operationSuccess } from '../global.actions';
import { GlobalEffects } from '../global.effects';

describe('GlobalEffects', () => {
  let actions$: Observable<any>;
  let effects: GlobalEffects;
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GlobalEffects,
        provideMockActions(() => actions$),
        {
          provide: MessageService, 
          useValue: { add: jasmine.createSpy('add') } 
        },
        provideMockStore(),
      ]
    });

    effects = TestBed.inject(GlobalEffects);
    messageService = TestBed.inject(MessageService);
  });

  it('should display a toast error when action dispatched', () => {
    const errorMsg = 'Errore generico';
    const action = handleError({ errorMsg });

    actions$ = of(action);

    effects.showErrorMessage$.subscribe(() => {
      expect(messageService.add).toHaveBeenCalledWith({
        severity: 'error',
        summary: 'Errore',
        detail: errorMsg
      });
    });
  });

  it('should display a toast success when action dispatched', () => {
    const message = 'Operazione eseguita con successo';
    const action = operationSuccess({message})

    actions$ = of(action);

    effects.showSuccessMessage$.subscribe(() => {
      expect(messageService.add).toHaveBeenCalledWith({
        severity: 'success',
        summary: 'Successo',
        detail: message
      });
    });
  });
});
