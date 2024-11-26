import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
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

@NgModule({
  declarations: [
    TitleComponent
  ],
  imports: [
    CommonModule,
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
    ConfirmPopupModule
  ],
  exports: [
    TitleComponent,
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
    ConfirmPopupModule
  ],
  providers: [
  ]
})
export class SharedModule { }
