import { createReducer, on } from "@ngrx/store";
import { persistStoreId } from "./app.actions";

export interface AppState {
  idStore: string
}

export const initialState: AppState = {
  idStore: ''
};

export const appReducer = createReducer(
  initialState,
  on(persistStoreId, (state, { idStore }) => ({
    ...state,
    idStore,
  }))
);