import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StatsCategories } from 'src/app/core/api/models/statsCategories';
import { getStatsCategoriesById } from '../redux/statistics.actions';
import { StatisticsState } from '../redux/statistics.reducers';
import { selectStatsCategories } from '../redux/statistics.selectors';


@Injectable({
    providedIn: 'root',
})
export class StatisticsFacade {

    constructor(private readonly store: Store<StatisticsState>) { }

    statisticsCategories$: Observable<StatsCategories[]> = this.store.pipe(select(selectStatsCategories));

    getStatsCategoriesById(): void {
        this.store.dispatch(getStatsCategoriesById());
    }
}
