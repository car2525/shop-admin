import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MessageService } from 'primeng/api';
import { Observable, of, throwError } from 'rxjs';
import { Store } from 'src/app/core/api/models/store';
import { ApiService } from '../../api/api/api.service';
import { handleError, operationSuccess, persistStore, persistStoreId } from '../global.actions';
import { GlobalEffects } from '../global.effects';
describe('GlobalEffects', () => {
  let actions$: Observable<any>;
  let effects: GlobalEffects;
  let messageService: MessageService;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    apiService = jasmine.createSpyObj('ApiService', [
      'getStoresIdStore',
    ]);
    TestBed.configureTestingModule({
      providers: [
        GlobalEffects,
        provideMockActions(() => actions$),
        {
          provide: MessageService,
          useValue: { add: jasmine.createSpy('add') }
        },
        { provide: ApiService, useValue: apiService },
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
    const action = operationSuccess({ message })

    actions$ = of(action);

    effects.showSuccessMessage$.subscribe(() => {
      expect(messageService.add).toHaveBeenCalledWith({
        severity: 'success',
        summary: 'Successo',
        detail: message
      });
    });
  });

  it('should dispatch persistStore on getStoreById success', (done) => {
    const mockStore: Store = { name: 'Negozio 1', category: 'Test category', employees: ['Paolo', 'Mario'] };
    const action = persistStoreId({ idStore: 'abc123' });
    const expectedAction = persistStore({ store: mockStore });

    apiService.getStoresIdStore.and.returnValue(of(mockStore));
    actions$ = of(action);

    effects.getStoreById$.subscribe((result) => {
      expect(result).toEqual(expectedAction);
      done(); // test completato
    });
  });

  it('should dispatch handleError on getStoreById failure', (done) => {
    const action = persistStoreId({ idStore: 'abc123' });
    const expectedAction = handleError({ errorMsg: 'Errore nel recupero delle informazioni sul negozio' });

    apiService.getStoresIdStore.and.returnValue(throwError(() => new Error('Error')));
    actions$ = of(action);

    effects.getStoreById$.subscribe((result) => {
      expect(result).toEqual(expectedAction);
      done();
    });
  });

});
