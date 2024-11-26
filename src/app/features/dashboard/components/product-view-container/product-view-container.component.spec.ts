import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from 'primeng/api';
import { CoreModule } from 'src/app/core/core.module';
import { Product } from 'src/app/core/models/products';
import { DashboardModule } from '../../dashboard.module';
import { ProductViewContainerComponent } from './product-view-container.component';

describe('ProductViewContainerComponent', () => {
  let component: ProductViewContainerComponent;
  let fixture: ComponentFixture<ProductViewContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductViewContainerComponent],
      imports: [CoreModule, SharedModule, DashboardModule]
    });

    fixture = TestBed.createComponent(ProductViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show dialog', () => {
    component.showDialog();
    expect(component.isDialogVisible).toBeTrue();
  });

  it('should hide dialog', () => {
    component.hideDialog();
    expect(component.isDialogVisible).toBeFalse();
  });

  it('should emit onAddProductEvt when a product is added', () => {
    const product: Product = { id: '1', title: 'Product 1', category: 'Category', price: 100 };
    spyOn(component.onAddProductEvt, 'emit');
    component.onProductAdded(product);
    expect(component.onAddProductEvt.emit).toHaveBeenCalledWith(product);
    expect(component.isDialogVisible).toBeFalse();
  });

  it('should emit onDeleteProductEvt when a product is deleted', () => {
    const productId = '1';
    spyOn(component.onDeleteProductEvt, 'emit');
    component.deleteProduct(productId);
    expect(component.onDeleteProductEvt.emit).toHaveBeenCalledWith(productId);
  });
});
