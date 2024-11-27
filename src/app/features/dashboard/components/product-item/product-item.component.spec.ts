import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService } from 'primeng/api';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductItemComponent } from './product-item.component';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ProductItemComponent],
      imports: [SharedModule, BrowserAnimationsModule],
      providers: [ConfirmationService]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;

    component.product = {
      id: '1',
      title: 'Test Product',
      description: 'Test description',
      category: 'Test category',
      employee: 'Test employee',
      reviews: ['Review 1', 'Review 2'],
      price: 100,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the correct productImage', () => {
    expect(component.productImage).toBe('assets/sweet.jpg');
  });

  it('should have default layout as "list"', () => {
    expect(component.layout).toBe('list');
  });

});
