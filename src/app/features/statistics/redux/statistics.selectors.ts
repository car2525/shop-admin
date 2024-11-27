import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StatisticsState } from "./statistics.reducers";

export const selectStatisticsState =
    createFeatureSelector<StatisticsState>('statisticsState');

export const selectStatsCategories = createSelector(
    selectStatisticsState,
    (state) => state.statsCategories
);