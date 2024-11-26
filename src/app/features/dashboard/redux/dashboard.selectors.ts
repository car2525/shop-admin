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

export const selectStoreEmployees = createSelector(
    selectDashboardState,
    (state) => [''].concat(state.store?.employees ?? [])
);

export const selectProducts = createSelector(
    selectDashboardState,
    (state) => state.products
);

export const selectProductsSortedByTitle = createSelector(
    selectProducts,
    (products) => {
      if (!products) {
        return [];
      }
      return [...products].sort((a, b) => a.title.localeCompare(b.title));
    }
  );

export const selectSelectedProduct = createSelector(
    selectDashboardState,
    (state) => state.selectedProduct
);