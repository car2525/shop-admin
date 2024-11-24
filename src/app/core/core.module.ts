import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { HeaderComponent } from './components/header/header.component';
import { HttpInterceptorService } from './interceptors/http.interceptor';
import { GlobalEffects } from './redux/global.effects';
import { globalReducer } from './redux/global.reducers';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MenubarModule,
    ToastModule,
    StoreModule.forRoot({ globalState: globalReducer }),
    EffectsModule.forRoot([GlobalEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }, MessageService
  ],
  exports: [HeaderComponent, ToastModule]
})
export class CoreModule { }
