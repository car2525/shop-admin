import { createAction, props } from "@ngrx/store";
import { Store } from "../api/models/store";

const prefixGlobalAction = '[GLOBAL]';

export const handleError = createAction(
    `${prefixGlobalAction} handle app error`,
    props<{ errorMsg: string }>()
);

export const operationSuccess = createAction(
    `${prefixGlobalAction} operation success`,
    props<{ message: string }>()
);

export const loadingStart = createAction(`${prefixGlobalAction} loading start`);
export const loadingStop = createAction(`${prefixGlobalAction} loading stop`);

export const persistStoreId = createAction(
    `${prefixGlobalAction} persist store id`,
    props<{ idStore: string }>()
);
export const getStoreById = createAction(`${prefixGlobalAction} get store by id`);
export const persistStore = createAction(
    `${prefixGlobalAction} persist Store result`,
    props<{ store: Store }>()
);