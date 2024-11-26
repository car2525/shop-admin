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
import { ProductFormComponent } from './components/product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [
    DashboardComponent,
    ProductViewContainerComponent,
    ProductItemComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    StoreModule.forFeature('dashboardState', dashboardReducer),
    EffectsModule.forFeature([DashboardEffects]),
  ],
  providers: [ConfirmationService]
})
export class DashboardModule { }
