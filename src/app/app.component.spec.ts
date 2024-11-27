import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { STORE_ID } from './core/constants/constants';
import { GlobalFacade } from './core/services/global.facade';

describe('AppComponent', () => {
  let globalFacade: GlobalFacade;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const spy = jasmine.createSpyObj('GlobalFacade', ['persistIdStore']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [CoreModule, RouterTestingModule],
      providers: [ 
        { provide: GlobalFacade, useValue: spy },
        provideMockStore({
          initialState: { 
            idStore: ''
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    globalFacade = TestBed.inject(GlobalFacade) as jasmine.SpyObj<GlobalFacade>;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call persistIdStore with the correct STORE_ID on ngOnInit', () => {
    component.ngOnInit();
    expect(globalFacade.persistIdStore).toHaveBeenCalledOnceWith(STORE_ID);
  });

});
