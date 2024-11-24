import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductViewContainerComponent } from './product-view-container.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ProductViewContainerComponent', () => {
  let component: ProductViewContainerComponent;
  let fixture: ComponentFixture<ProductViewContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductViewContainerComponent],
      imports: [SharedModule]
    });
    fixture = TestBed.createComponent(ProductViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
