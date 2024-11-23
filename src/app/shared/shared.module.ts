import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TitleComponent } from './components/title/title.component';



@NgModule({
  declarations: [
    TitleComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    DividerModule
  ],
  exports: [TitleComponent]
})
export class SharedModule { }
