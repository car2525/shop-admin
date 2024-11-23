import { createAction, props } from "@ngrx/store";

const prefixAppAction = '[APP]';

export const persistStoreId = createAction(
    `${prefixAppAction} persist store id`,
    props<{ idStore: string }>()
);

export const handleError = createAction(
    `${prefixAppAction} handle app error`,
    props<{ errorMsg: string}>()
);

export const operationSuccess = createAction(
    `${prefixAppAction} operation success`,
    props<{ message: string }>()
  );

