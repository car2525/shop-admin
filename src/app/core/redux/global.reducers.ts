import { createReducer, on } from "@ngrx/store";
import { loadingStart, loadingStop, persistStoreId } from "./global.actions";

export interface GlobalState {
  idStore: string;
  isLoading: boolean
}

export const initialState: GlobalState = {
  idStore: '',
  isLoading: false
};

export const globalReducer = createReducer(
  initialState,
  on(persistStoreId, (state, { idStore }) => ({
    ...state,
    idStore,
  })),
  on(loadingStart, state => ({ ...state, isLoading: true })),
  on(loadingStop, state => ({ ...state, isLoading: false }))
);