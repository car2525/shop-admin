import { TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { provideMockStore } from "@ngrx/store/testing";
import { StatisticsFacade } from "./statistics.facade";
import { getStatsCategoriesById } from "../redux/statistics.actions";

describe('StatisticsFacade', () => {
    let facade: StatisticsFacade;
    let store: jasmine.SpyObj<Store>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                StatisticsFacade,
                provideMockStore(),
            ],
        });

        facade = TestBed.inject(StatisticsFacade);
        store = TestBed.inject(Store) as jasmine.SpyObj<Store>;

        spyOn(store, 'dispatch');
    });

    it('should dispatch getStatsCategoriesById action', () => {
        facade.getStatsCategoriesById();
        expect(store.dispatch).toHaveBeenCalledWith(getStatsCategoriesById());
    });

});
