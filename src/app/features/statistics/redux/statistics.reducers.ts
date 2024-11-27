import { createReducer, on } from "@ngrx/store";
import { StatsCategories } from "src/app/core/api/models/statsCategories";
import { getStatsCategoriesById, persistStatsCategories } from "./statistics.actions";

export interface StatisticsState {
  statsCategories: StatsCategories[] | [];
}

export const initialState: StatisticsState = {
  statsCategories: []
};

export const statisticsReducer = createReducer(
  initialState,
  on(persistStatsCategories, (state, { statsCategories }) => ({
    ...state,
    statsCategories,
  })),
  // empty graph when execute action of get
  on(getStatsCategoriesById, (state, { }) => ({
    ...state,
    statsCategories: [],
  })),
);