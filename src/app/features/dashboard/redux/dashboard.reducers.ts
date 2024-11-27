import { createReducer, on } from "@ngrx/store";
import { Product } from "src/app/core/models/products";
import { persistDetailProduct, persistProducts } from "./dashboard.actions";

export interface DashboardState {
  products: Product[] | null;
  selectedProduct: Product | null;
}

export const initialState: DashboardState = {
  products: null,
  selectedProduct: null
};

export const dashboardReducer = createReducer(
  initialState,
  on(persistProducts, (state, { products }) => ({
    ...state,
    products,
  })),
  on(persistDetailProduct, (state, { product }) => ({
    ...state,
    selectedProduct: product,
  }))
);