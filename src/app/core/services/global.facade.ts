import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getStoreById, loadingStart, loadingStop, persistStore, persistStoreId } from '../redux/global.actions';
import { GlobalState } from '../redux/global.reducers';
import { selectIdStore, selectIsLoading, selectStore, selectStoreEmployees, selectStoreName } from '../redux/global.selectors';
import { Store as StoreModel } from 'src/app/core/api/models/store';
@Injectable({
    providedIn: 'root',
})
export class GlobalFacade {

    constructor(private readonly store: Store<GlobalState>) { }

    storeId$: Observable<string> = this.store.pipe(select(selectIdStore));
    isLoading$: Observable<boolean> = this.store.pipe(select(selectIsLoading));

    store$: Observable<StoreModel | null> = this.store.pipe(select(selectStore));
    storeName$: Observable<string> = this.store.pipe(select(selectStoreName));
    storeEmployees$: Observable<string[]> = this.store.pipe(select(selectStoreEmployees));

    startLoading(): void {
        this.store.dispatch(loadingStart());
    }

    stopLoading(): void {
        this.store.dispatch(loadingStop());
    }

    persistIdStore(idStore: string): void {
        this.store.dispatch(persistStoreId({ idStore: idStore }));
    }

    getStoreById(): void {
        this.store.dispatch(getStoreById());
    }

    persistStore(store: StoreModel): void {
        this.store.dispatch(persistStore({ store }));
    }

}
