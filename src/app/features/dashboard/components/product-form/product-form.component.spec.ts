import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DashboardModule } from '../../dashboard.module';
import { ProductFormComponent } from './product-form.component';
import { CoreModule } from 'src/app/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      imports: [CoreModule, DashboardModule,
        BrowserAnimationsModule,
        InputTextModule,
        InputTextareaModule,
        InputNumberModule,
        DropdownModule,
        AccordionModule]
    });
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with default values', () => {
    const form = component.productForm;
    expect(form).toBeTruthy();
    expect(form.controls['title'].value).toBe('');
    expect(form.controls['category'].value).toBe('');
    expect(form.controls['price'].value).toBe('');
    expect(form.controls['employee'].value).toBeNull();
    expect(form.controls['description'].value).toBeNull();
    expect(form.controls['reviews'].value).toEqual([]);
  });

  it('should emit addEvt with valid data when the form is valid', () => {
    spyOn(component.addEvt, 'emit'); 

    // valori validi nel form
    component.productForm.controls['title'].setValue('Test');
    component.productForm.controls['category'].setValue('Category test');
    component.productForm.controls['price'].setValue(1);
    component.productForm.controls['employee'].setValue('Mario');
    component.productForm.controls['description'].setValue('Description');
    
    component.onSubmit();

    expect(component.addEvt.emit).toHaveBeenCalled(); 
    expect(component.addEvt.emit).toHaveBeenCalledWith(jasmine.objectContaining(
      { title: 'Test', }
    ));
  });

  it('should not emit addEvt if the form is not valid', () => {
    spyOn(component.addEvt, 'emit');

    component.productForm.controls['title'].setValue('');
    component.onSubmit();

    expect(component.addEvt.emit).not.toHaveBeenCalled();
  });

  it('should emit cancelEvt when cancel button is clicked', () => {
    spyOn(component.cancelEvt, 'emit'); 

    const cancelButton = fixture.debugElement.query(By.css('.cancel-button')); 
    cancelButton.triggerEventHandler('click', null);

    expect(component.cancelEvt.emit).toHaveBeenCalled(); 
  });

  it('should add a review when addReview is called', () => {
    component.productForm.controls['review'].setValue('Great product!');
    component.addReview();

    expect(component.productReviews.length).toBe(1); 
    expect(component.productReviews[0]).toBe('Great product!');
  });

  it('should remove a review when removeReview is called', () => {
    component.productReviews = ['Great product!'];

    component.removeReview(0);

    expect(component.productReviews.length).toBe(0); 
  });

});
