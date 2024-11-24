import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadingStart, loadingStop, persistStoreId } from '../redux/global.actions';
import { GlobalState } from '../redux/global.reducers';
import { selectIdStore, selectIsLoading } from '../redux/global.selectors';

@Injectable({
    providedIn: 'root',
})
export class GlobalFacade {

    constructor(private readonly store: Store<GlobalState>) { }

    storeId$: Observable<string> = this.store.pipe(select(selectIdStore));
    isLoading$: Observable<boolean> = this.store.pipe(select(selectIsLoading));

    persistIdStore(idStore: string): void {
        this.store.dispatch(persistStoreId({ idStore: idStore }));
    }

    startLoading(): void {
        this.store.dispatch(loadingStart());
    }

    stopLoading(): void {
        this.store.dispatch(loadingStop());
    }

}
