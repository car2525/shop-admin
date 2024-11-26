import { Store } from 'src/app/core/api/models/store';
import { dashboardReducer, initialState } from '../dashboard.reducers';
import { persistDetailProduct, persistProducts, persistStore } from '../dashboard.actions';
import { Product } from 'src/app/core/models/products';

describe('Dashboard Reducer', () => {
    it('should return the initial state for an unknown action', () => {
        const unknownAction = { type: 'Unknown' } as any;
        const state = dashboardReducer(initialState, unknownAction);

        expect(state).toEqual(initialState);
    });

    it('should update the store on persistStore action', () => {
        const storeMock: Store = {
            name: 'Negozio Test',
            category: 'Test category',
            employees: ['Test employee1', 'Test employee2']
        };

        const action = persistStore({ store: storeMock });
        const state = dashboardReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            store: storeMock,
        });
    });

    it('should update the products on persistProducts action', () => {
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
        const action = persistProducts({ products: productsMock });
        const state = dashboardReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            products: productsMock,
        });
    });

    it('should update the selectedProduct on persistDetailProduct action', () => {
        const productMock: Product = { 
            id: 'abc123',
            category: 'Test category',
            price: 10,
            title: 'Test title',
         };
        const action = persistDetailProduct({ product: productMock });
        const state = dashboardReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            selectedProduct: productMock
        });
    });
});
