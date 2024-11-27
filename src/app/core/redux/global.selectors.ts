import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GlobalState } from "./global.reducers";

export const selectGlobalState =
    createFeatureSelector<GlobalState>('globalState');

export const selectIdStore = createSelector(
    selectGlobalState,
    (state) => state.idStore
);

export const selectIsLoading = createSelector(
    selectGlobalState,
    (state) => state.isLoading
);

export const selectStore = createSelector(
    selectGlobalState,
    (state) => state.store
);

export const selectStoreName = createSelector(
    selectGlobalState,
    (state) => state.store?.name ?? ''
);

export const selectStoreEmployees = createSelector(
    selectGlobalState,
    (state) => [''].concat(state.store?.employees ?? [])
);
