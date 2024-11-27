import { StatsCategories } from 'src/app/core/api/models/statsCategories';
import { getStatsCategoriesById, persistStatsCategories } from '../statistics.actions';
import { initialState, statisticsReducer, StatisticsState } from '../statistics.reducers';

describe('Statistics Reducer', () => {
    it('should return the initial state for an unknown action', () => {
      const unknownAction = { type: 'Unknown' } as any;
      const state = statisticsReducer(initialState, unknownAction);
  
      expect(state).toEqual(initialState);
    });
  
    it('should clear statsCategories on getStatsCategoriesById action', () => {
      const statsState: StatisticsState = {
        statsCategories: [
          { category: 'Category', numberOfProducts: 1 },
          { category: 'Category 2', numberOfProducts: 2 },
        ],
      };
  
      const action = getStatsCategoriesById();
      const state = statisticsReducer(statsState, action);
  
      expect(state).toEqual({
        ...statsState,
        statsCategories: [],
      });
    });
  
    it('should update statsCategories on persistStatsCategories action', () => {
      const statsCategoriesMock: StatsCategories[] = [
        { category: 'Category', numberOfProducts: 1 },
        { category: 'Category 2', numberOfProducts: 2 },
      ];
  
      const action = persistStatsCategories({ statsCategories: statsCategoriesMock });
      const state = statisticsReducer(initialState, action);
  
      expect(state).toEqual({
        ...initialState,
        statsCategories: statsCategoriesMock,
      });
    });
  });
  
