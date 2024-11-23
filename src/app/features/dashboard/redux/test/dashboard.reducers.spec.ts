import { Store } from 'src/app/core/api/models/store';
import { dashboardReducer, initialState } from '../dashboard.reducers';
import { persistDetailProductAfterGet, persistProductsAfterGet, persistStoreAfterGet } from '../dashboard.actions';
import { Product } from 'src/app/core/models/products';

describe('Dashboard Reducer', () => {
    it('should return the initial state for an unknown action', () => {
        const unknownAction = { type: 'Unknown' } as any;
        const state = dashboardReducer(initialState, unknownAction);

        expect(state).toEqual(initialState);
    });

    it('should update the store on persistStoreAfterGet action', () => {
        const storeMock: Store = {
            name: 'Negozio Test',
            category: 'Test category',
            employees: ['Test employee1', 'Test employee2']
        };

        const action = persistStoreAfterGet({ store: storeMock });
        const state = dashboardReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            store: storeMock,
        });
    });

    it('should update the products on persistProductsAfterGet action', () => {
        const productsMock: Product[] = [
            { 
                id: 'abc123',
                category: 'Test category',
                price: 10,
                title: 'Test title',
             },
             { 
                id: 'abc234',
                category: 'Test category',
                price: 6,
                title: 'Test title 2',
                description: 'Test description',
                reviews: ['Eccellente', 'Buono']
             }
        ];
        const action = persistProductsAfterGet({ products: productsMock });
        const state = dashboardReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            products: productsMock,
        });
    });

    it('should update the selectedProduct on persistDetailProductAfterGet action', () => {
        const productMock: Product = { 
            id: 'abc123',
            category: 'Test category',
            price: 10,
            title: 'Test title',
         };
        const action = persistDetailProductAfterGet({ product: productMock });
        const state = dashboardReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            selectedProduct: productMock
        });
    });
});
