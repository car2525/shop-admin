import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemComponent } from './product-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductItemComponent],
      imports: [SharedModule, BrowserAnimationsModule]
    });
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
});
