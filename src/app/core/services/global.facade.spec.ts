import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store as StoreModel } from "src/app/core/api/models/models";
import { getStoreById, loadingStart, loadingStop, persistStore, persistStoreId } from '../redux/global.actions';
import { selectIdStore, selectIsLoading } from '../redux/global.selectors';
import { GlobalFacade } from './global.facade';

describe('GlobalFacade', () => {
  let facade: GlobalFacade;
  let store: jasmine.SpyObj<Store>;
  let mockStore: MockStore;

  const initialState = {
    idStore: '',
    isLoading: false,
    store: null
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GlobalFacade,
        provideMockStore({ initialState }),
      ],
    });

    facade = TestBed.inject(GlobalFacade);
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    mockStore = TestBed.inject(Store) as MockStore;

    spyOn(store, 'dispatch');
  });

  it('should dispatch persistStoreId with correct value', () => {
    const idStore = 'abc456';
    facade.persistIdStore(idStore);

    expect(store.dispatch).toHaveBeenCalledWith(persistStoreId({ idStore }));
  });

  it('should select storeId$ from the state', (done) => {
    const idStore = 'abc123';
    mockStore.overrideSelector(selectIdStore, idStore);

    facade.storeId$.subscribe((result) => {
      expect(result).toEqual(idStore);
      done();
    });
  });

  it('should dispatch loadingStart when startLoading is called', () => {
    facade.startLoading();

    expect(store.dispatch).toHaveBeenCalledWith(loadingStart());
  });

  it('should dispatch loadingStop when stopLoading is called', () => {
    facade.stopLoading();

    expect(store.dispatch).toHaveBeenCalledWith(loadingStop());
  });

  it('should select isLoading$ from the state', (done) => {
    const isLoading = true;
    mockStore.overrideSelector(selectIsLoading, isLoading);

    facade.isLoading$.subscribe((result) => {
      expect(result).toEqual(isLoading);
      done();
    });
  });

  it('should dispatch getStoreById action', () => {
    facade.getStoreById();

    expect(store.dispatch).toHaveBeenCalledWith(getStoreById());
  });

  it('should dispatch persistStore action', () => {
    const mockStore: StoreModel = { name: 'Test Store', category: 'Category', employees: ['Alice', 'Mario'] };

    facade.persistStore(mockStore);

    expect(store.dispatch).toHaveBeenCalledWith(persistStore({ store: mockStore }));
  });

});
