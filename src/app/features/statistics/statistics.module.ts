import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { statisticsReducer } from './redux/statistics.reducers';
import { StatisticsEffects } from './redux/statistics.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    SharedModule,
    StoreModule.forFeature('statisticsState', statisticsReducer),
    EffectsModule.forFeature([StatisticsEffects]),
  ]
})
export class StatisticsModule { }
