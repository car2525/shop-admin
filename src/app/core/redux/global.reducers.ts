import { createReducer, on } from "@ngrx/store";
import { loadingStart, loadingStop, persistStore, persistStoreId } from "./global.actions";
import { Store } from "../api/models/store";

export interface GlobalState {
  idStore: string;
  isLoading: boolean,
  store: Store | null;
}

export const initialState: GlobalState = {
  idStore: '',
  isLoading: false,
  store: null
};

export const globalReducer = createReducer(
  initialState,
  on(persistStoreId, (state, { idStore }) => ({
    ...state,
    idStore,
  })),
  on(loadingStart, state => ({ ...state, isLoading: true })),
  on(loadingStop, state => ({ ...state, isLoading: false })),
  on(persistStore, (state, { store }) => ({
    ...state,
    store,
  })),
);