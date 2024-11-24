import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from "../../shared/shared.module";
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductViewContainerComponent } from './components/product-view-container/product-view-container.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardEffects } from './redux/dashboard.effects';
import { dashboardReducer } from './redux/dashboard.reducers';


@NgModule({
  declarations: [
    DashboardComponent,
    ProductViewContainerComponent,
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    StoreModule.forFeature('dashboardState', dashboardReducer),
    EffectsModule.forFeature([DashboardEffects]),
]
})
export class DashboardModule { }
