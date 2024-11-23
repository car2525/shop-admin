import { STORE_ID } from '../../constants/constants';
import { persistStoreId } from '../app.actions';
import { appReducer, initialState } from '../app.reducers';

describe('AppReducer', () => {

    it('should return the initial state for an unknown action', () => {
        const unknownAction = { type: 'Unknown' } as any;
        const state = appReducer(initialState, unknownAction);

        expect(state).toEqual(initialState);
    });

    it('should update idStore when  action persistStoreId dispatched', () => {
        const action = persistStoreId({ idStore: STORE_ID });
        const state = appReducer(initialState, action);

        expect(state.idStore).toBe(STORE_ID);
    });

});