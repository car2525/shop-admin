import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of, throwError } from 'rxjs';
import { ApiService } from 'src/app/core/api/api/api.service';
import { StatsCategories } from 'src/app/core/api/models/statsCategories';
import { handleError } from 'src/app/core/redux/global.actions';
import { selectIdStore } from 'src/app/core/redux/global.selectors';
import { getStatsCategoriesById, persistStatsCategories } from '../statistics.actions';
import { StatisticsEffects } from '../statistics.effects';

describe('StatisticsEffects', () => {
    let actions$: Actions;
    let effects: StatisticsEffects;
    let apiService: jasmine.SpyObj<ApiService>;
    let store: MockStore;

    const initialState = {
        idStore: 'abc123',
    };

    beforeEach(() => {
        apiService = jasmine.createSpyObj('ApiService', [
            'getStatsCategories'
        ]);

        TestBed.configureTestingModule({
            providers: [
                StatisticsEffects,
                provideMockActions(() => actions$),
                provideMockStore({ initialState }),
                { provide: ApiService, useValue: apiService },
            ],
        });

        effects = TestBed.inject(StatisticsEffects);
        store = TestBed.inject(MockStore);
        store.overrideSelector(selectIdStore, initialState.idStore);
    });

    it('should dispatch persistStatsCategories on getStatsCategories success', () => {
        const mockStatsCategories: StatsCategories[] = [
            { category: 'Category', numberOfProducts: 1 },
            { category: 'Category 2', numberOfProducts: 2 },
        ]
        apiService.getStatsCategories.and.returnValue(of(mockStatsCategories));
        actions$ = of(getStatsCategoriesById());

        effects.getStatsCategoriesById$.subscribe((result) => {
            expect(result).toEqual(persistStatsCategories({ statsCategories: mockStatsCategories }));
        });
    });

    it('should dispatch handleError on getStoreById failure', () => {
        apiService.getStatsCategories.and.returnValue(throwError(() => new Error('Error')));
        actions$ = of(getStatsCategoriesById());

        effects.getStatsCategoriesById$.subscribe((result) => {
            expect(result).toEqual(handleError({ errorMsg: 'Errore nel recupero delle statistiche' }));
        });
    });
});
