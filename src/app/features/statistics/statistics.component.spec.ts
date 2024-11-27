import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalFacade } from 'src/app/core/services/global.facade';
import { StatisticsFacade } from './services/statistics.facade';
import { StatisticsComponent } from './statistics.component';
import { provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { of } from 'rxjs';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;

  let statisticsFacade: jasmine.SpyObj<StatisticsFacade>;
  let globalFacade: jasmine.SpyObj<GlobalFacade>;

  beforeEach(() => {
    const spyStatsFacade = jasmine.createSpyObj('StatisticsFacade', ['getStatsCategoriesById'], {
      statisticsCategories$: of([]), 
    });

    const spyGlobalFacade = jasmine.createSpyObj('GlobalFacade', [], {
      storeName$: of('Negozio name'),
    });

    TestBed.configureTestingModule({
      declarations: [StatisticsComponent],
      imports: [SharedModule],
      providers: [
        provideMockStore({}),
        { provide: StatisticsFacade, useValue: spyStatsFacade },
        { provide: GlobalFacade, useValue: spyGlobalFacade },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    statisticsFacade = TestBed.inject(StatisticsFacade) as jasmine.SpyObj<StatisticsFacade>;
    globalFacade = TestBed.inject(GlobalFacade) as jasmine.SpyObj<GlobalFacade>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getStatsCategoriesById on ngOnInit', () => {
    expect(statisticsFacade.getStatsCategoriesById).toHaveBeenCalled();
  });
});
