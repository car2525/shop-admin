import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { DividerModule } from 'primeng/divider';
import { ListboxModule } from 'primeng/listbox';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { TitleComponent } from './components/title/title.component';
import { AccordionModule } from 'primeng/accordion';
import {BadgeModule} from 'primeng/badge';


@NgModule({
  declarations: [
    TitleComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    DividerModule,
    DataViewModule,
    TooltipModule,
    ListboxModule,
    AccordionModule,
    BadgeModule
  ],
  exports: [
    ProgressSpinnerModule,
    DividerModule,
    DataViewModule,
    TooltipModule,
    ListboxModule,
    AccordionModule,
    BadgeModule,
    TitleComponent]
})
export class SharedModule { }
