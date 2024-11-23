import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app.reducers";

export const selectAppState =
    createFeatureSelector<AppState>('appState');

export const selectIdStore = createSelector(
    selectAppState,
    (state) => state.idStore
);
