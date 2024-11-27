import { Store } from '../../api/models/models';
import { STORE_ID } from '../../constants/constants';
import { loadingStart, loadingStop, persistStore, persistStoreId } from '../global.actions';
import { globalReducer, initialState } from '../global.reducers';

describe('GlobalReducer', () => {

    it('should return the initial state for an unknown action', () => {
        const unknownAction = { type: 'Unknown' } as any;
        const state = globalReducer(initialState, unknownAction);

        expect(state).toEqual(initialState);
    });

    it('should update idStore when  action persistStoreId dispatched', () => {
        const action = persistStoreId({ idStore: STORE_ID });
        const state = globalReducer(initialState, action);

        expect(state.idStore).toBe(STORE_ID);
    });

    it('should set isLoading to true when loadingStart action is dispatched', () => {
        const action = loadingStart();
        const state = globalReducer(initialState, action);

        expect(state.isLoading).toBe(true);
    });

    it('should set isLoading to false when loadingStop action is dispatched', () => {
        const action = loadingStop();
        const state = globalReducer(initialState, action);

        expect(state.isLoading).toBe(false);
    });

    it('should update the store on persistStore action', () => {
        const storeMock: Store = {
            name: 'Negozio Test',
            category: 'Test category',
            employees: ['Test employee1', 'Test employee2']
        };

        const action = persistStore({ store: storeMock });
        const state = globalReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            store: storeMock,
        });
    });

});