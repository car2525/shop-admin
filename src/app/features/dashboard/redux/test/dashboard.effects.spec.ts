import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of, throwError, toArray } from 'rxjs';
import { ApiService } from 'src/app/core/api/api/api.service';
import { ProductResponse } from 'src/app/core/api/models/productResponse';
import { Store } from 'src/app/core/api/models/store';
import { handleError, operationSuccess } from 'src/app/core/redux/global.actions';
import { selectIdStore } from 'src/app/core/redux/global.selectors';
import { deleteProduct, getProducts, getStoreById, persistProducts, persistStore, saveNewProduct } from '../dashboard.actions';
import { DashboardEffects } from '../dashboard.effects';

describe('DashboardEffects', () => {
    let actions$: Actions;
    let effects: DashboardEffects;
    let apiService: jasmine.SpyObj<ApiService>;
    let store: MockStore;

    const initialState = {
        idStore: 'abc123',
    };

    beforeEach(() => {
        apiService = jasmine.createSpyObj('ApiService', [
            'getStoresIdStore',
            'getProductsIdStore',
            'postProducts',
            'deleteProduct',
        ]);

        TestBed.configureTestingModule({
            providers: [
                DashboardEffects,
                provideMockActions(() => actions$),
                provideMockStore({ initialState }),
                { provide: ApiService, useValue: apiService },
            ],
        });

        effects = TestBed.inject(DashboardEffects);
        store = TestBed.inject(MockStore);
        store.overrideSelector(selectIdStore, initialState.idStore);
    });

    it('should dispatch persistStore on getStoreById success', () => {
        const mockStore: Store = { name: 'Negozio 1', category: 'Test category', employees: ['Paolo', 'Mario'] };
        apiService.getStoresIdStore.and.returnValue(of(mockStore));
        actions$ = of(getStoreById());

        effects.getStoreById$.subscribe((result) => {
            expect(result).toEqual(persistStore({ store: mockStore }));
        });
    });

    it('should dispatch handleError on getStoreById failure', () => {
        apiService.getStoresIdStore.and.returnValue(throwError(() => new Error('Error')));
        actions$ = of(getStoreById());

        effects.getStoreById$.subscribe((result) => {
            expect(result).toEqual(handleError({ errorMsg: 'Errore nel recupero delle informazioni sul negozio' }));
        });
    });

    it('should dispatch persistProducts on getProducts success', () => {
        const products = [
            { title: 'Product 1', category: 'Test category', price: 4, reviews: ['Great', '', '  '] },
            { title: 'Product 2', category: 'Test category', price: 6, reviews: ['Amazing', ''] },
        ];

        const normalizedProducts = [
            { id: 'abc123', title: 'Product 1', category: 'Test category', price: 4, reviews: ['Great'] },
            { id: 'abc234', title: 'Product 2', category: 'Test category', price: 6, reviews: ['Amazing'] },
        ];

        const mockProducts: ProductResponse[] = [
            { id: 'abc123', data: products[0] },
            { id: 'abc234', data: products[1] },
        ];

        apiService.getProductsIdStore.and.returnValue(of(mockProducts));
        actions$ = of(getProducts({}));

        effects.getProducts$.subscribe((result) => {
            expect(result).toEqual(
                persistProducts({
                    products: normalizedProducts,
                })
            );
        });
    });

    it('should dispatch handleError on getProducts failure', () => {
        apiService.getProductsIdStore.and.returnValue(throwError(() => new Error('Error server')));
        actions$ = of(getProducts({}));

        effects.getProducts$.subscribe((result) => {
            expect(result).toEqual(handleError({ errorMsg: 'Errore nel recupero dei prodotti' }));
        });
    });

    it('should dispatch operationSuccess, persistProducta and getProducts on saveNewProduct success', () => {
        apiService.postProducts.and.returnValue(of('abc123'));
        actions$ = of(saveNewProduct(
            {
                product:
                {
                    title: 'New Product',
                    category: 'Category 1',
                    price: 10,
                    description: 'Test description',
                    employee: 'Mario',
                    reviews: ['Ok']
                }
            }
        ));

        effects.saveNewProduct$.pipe(toArray()).subscribe((results) => {
            expect(results).toEqual([
                operationSuccess({ message: 'Prodotto salvato con successo!' }),
                persistProducts({ products: [] }),
                getProducts({}),
            ]);
        });
    });

    it('should dispatch handleError on saveNewProduct failure', () => {
        apiService.postProducts.and.returnValue(throwError(() => new Error('Error')));
        actions$ = of(saveNewProduct({ product: { title: 'New Product', category: 'Category 1', price: 14 } }));

        effects.saveNewProduct$.subscribe((result) => {
            expect(result).toEqual(handleError({ errorMsg: 'Errore durante il salvataggio' }));
        });
    });

    it('should dispatch operationSuccess, persistProducts and getProducts on deleteProduct success', () => {

        apiService.deleteProduct.and.returnValue(of('cancel ok'));
        actions$ = of(deleteProduct({ idProduct: 'abc123' }));

        effects.deleteProduct$.pipe(toArray()).subscribe((results) => {
            expect(results).toEqual([
                operationSuccess({ message: 'Prodotto eliminato con successo!' }),
                persistProducts({ products: [] }),
                getProducts({}),
            ]);
        });
    });

    it('should dispatch handleError on deleteProduct failure', () => {
        apiService.deleteProduct.and.returnValue(throwError(() => new Error('Error')));
        actions$ = of(deleteProduct({ idProduct: '123' }));

        effects.deleteProduct$.subscribe((result) => {
            expect(result).toEqual(handleError({ errorMsg: 'Errore durante l\'operazione' }));
        });
    });
});
