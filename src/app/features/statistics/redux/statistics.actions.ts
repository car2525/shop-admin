import { createAction, props } from "@ngrx/store";
import { StatsCategories } from "src/app/core/api/models/statsCategories";

const prefixStatsAction = '[STATS]';

export const getStatsCategoriesById = createAction(`${prefixStatsAction} get statistics category by store id`);

export const persistStatsCategories = createAction(
    `${prefixStatsAction} persist stats categories`,
    props<{ statsCategories: StatsCategories[] }>()
);