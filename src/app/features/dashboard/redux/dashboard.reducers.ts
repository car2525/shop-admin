import { createReducer, on } from "@ngrx/store";
import { Store } from "src/app/core/api/models/store";
import { deleteProduct, persistDetailProduct, persistProducts, persistStore, saveNewProduct } from "./dashboard.actions";
import { Product } from "src/app/core/models/products";

export interface DashboardState {
  store: Store | null;
  products: Product[] | null;
  selectedProduct: Product | null;
}

export const initialState: DashboardState = {
  store: null,
  products: null,
  selectedProduct: null
};

export const dashboardReducer = createReducer(
  initialState,
  on(persistStore, (state, { store }) => ({
    ...state,
    store,
  })),
  on(persistProducts, (state, { products }) => ({
    ...state,
    products,
  })),
  on(persistDetailProduct, (state, { product }) => ({
    ...state,
    selectedProduct: product,
  }))
);