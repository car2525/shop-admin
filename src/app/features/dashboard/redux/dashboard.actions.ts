import { createAction, props } from "@ngrx/store";
import { Store } from "src/app/core/api/models/store";
import { Product } from "src/app/core/models/products";

const prefixDashboardAction = '[DASHBOARD]';

export const getStoreById = createAction(`${prefixDashboardAction} get store by id`);

export const persistStoreAfterGet = createAction(
    `${prefixDashboardAction} persist Store result`,
    props<{ store: Store }>()
);

export const getProducts = createAction(
    `${prefixDashboardAction} Get products of store`,
    props<{ page?: number, elements?: number }>());

export const persistProductsAfterGet = createAction(
    `${prefixDashboardAction} persist Products result`,
    props<{ products: Product[] }>()
);

export const saveNewProduct = createAction(
    `${prefixDashboardAction} save new Product`,
    props<{ product: Product }>()
);

export const saveProductSuccess = createAction(
   `${prefixDashboardAction} save Product success`,
    props<{ message: string }>()
  );
  

export const getProductById = createAction(
    `${prefixDashboardAction} get Product by id`,
    props<{ idProduct: string }>()
);

export const persistDetailProductAfterGet = createAction(
    `${prefixDashboardAction} persist detail product`,
    props<{ product: Product }>()
);

export const deleteProduct = createAction(
    `${prefixDashboardAction} delete Product by id`,
    props<{ idProduct: string }>()
);

export const deleteProductSuccess = createAction(
    `${prefixDashboardAction} delete Product success`,
    props<{ message: string }>()
  );