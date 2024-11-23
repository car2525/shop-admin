import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { persistStoreId } from '../redux/app.actions';
import { AppState } from '../redux/app.reducers';
import { selectIdStore } from '../redux/app.selectors';

@Injectable({
    providedIn: 'root',
})
export class AppFacade {

    constructor(private readonly store: Store<AppState>) { }

    storeId$: Observable<string> = this.store.pipe(select(selectIdStore));

    persistIdStore(idStore: string): void {
        this.store.dispatch(persistStoreId({ idStore: idStore }));
    }

}
