import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { STORE_ID } from './core/constants/constants';
import { AppFacade } from './core/services/app.facade';

describe('AppComponent', () => {
  let appFacade: AppFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [CoreModule, RouterTestingModule],
      providers: [
        AppFacade,
        provideMockStore({
          initialState: { 
            idStore: ''
          },
        }),
      ],
    }).compileComponents();

    appFacade = TestBed.inject(AppFacade);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call persistIdStore with the correct STORE_ID', () => {
    const spy = spyOn(appFacade, 'persistIdStore'); // Spia sul metodo del facade
    TestBed.createComponent(AppComponent);
    expect(spy).toHaveBeenCalledOnceWith(STORE_ID); // Verifica che il valore sia passato
  });

});
