import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreModule } from 'src/app/core/core.module';
import { Product } from 'src/app/core/models/products';
import { DashboardComponent } from './dashboard.component';
import { DashboardModule } from './dashboard.module';
import { DashboardFacade } from './services/dashboard.facade';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dashboardFacade: jasmine.SpyObj<DashboardFacade>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('DashboardFacade', [
      'getStoreById',
      'getProducts',
      'deleteProduct',
      'saveNewProduct'
    ]);

    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [CoreModule, DashboardModule],
      providers: [{ provide: DashboardFacade, useValue: spy }]
    });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    dashboardFacade = TestBed.inject(DashboardFacade) as jasmine.SpyObj<DashboardFacade>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getStoreById and getProducts on ngOnInit', () => {
    component.ngOnInit();
    expect(dashboardFacade.getStoreById).toHaveBeenCalled();
    expect(dashboardFacade.getProducts).toHaveBeenCalled();
  });

  it('should call deleteProduct on deleteProduct', () => {
    const productId = 'abc123';
    component.deleteProduct(productId);
    expect(dashboardFacade.deleteProduct).toHaveBeenCalledWith(productId);
  });

  it('should call saveNewProduct on saveProduct', () => {
    const product: Product = { title: 'Product 1', category: 'Category test', price: 10 };
    component.saveProduct(product);
    expect(dashboardFacade.saveNewProduct).toHaveBeenCalledWith(product);
  });
});
