import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListboxModule } from 'primeng/listbox';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { TitleComponent } from './components/title/title.component';
import { FormsModule } from '@angular/forms';
import { ChartComponent } from './components/chart/chart.component';

@NgModule({
  declarations: [
    TitleComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ProgressSpinnerModule,
    DividerModule,
    DataViewModule,
    TooltipModule,
    ListboxModule,
    AccordionModule,
    BadgeModule,
    MessageModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DropdownModule,
    DialogModule,
    ButtonModule,
    ConfirmPopupModule,
    ChartModule
  ],
  exports: [
    TitleComponent,
    ChartComponent,
    CardModule,
    ProgressSpinnerModule,
    DividerModule,
    DataViewModule,
    TooltipModule,
    ListboxModule,
    AccordionModule,
    BadgeModule,
    MessageModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DropdownModule,
    DialogModule,
    ButtonModule,
    ConfirmPopupModule,
    ChartModule,
  ],
  providers: [],
  
})
export class SharedModule { }
