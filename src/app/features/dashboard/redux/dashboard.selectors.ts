import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DashboardState } from "./dashboard.reducers";

export const selectDashboardState =
    createFeatureSelector<DashboardState>('dashboardState');

export const selectStore = createSelector(
    selectDashboardState,
    (state) => state.store
);

export const selectStoreName = createSelector(
    selectDashboardState,
    (state) => state.store?.name ?? ''
);

export const selectProducts = createSelector(
    selectDashboardState,
    (state) => state.products
);

export const selectSelectedProduct = createSelector(
    selectDashboardState,
    (state) => state.selectedProduct
);