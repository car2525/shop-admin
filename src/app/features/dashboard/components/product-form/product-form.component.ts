import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/core/models/products';

@Component({
  selector: 'sa-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ProductFormComponent implements OnInit {

  @Output() addEvt = new EventEmitter<Product>();
  @Output() cancelEvt = new EventEmitter<void>();

  @Input() employees: string[] = [];

  productForm!: FormGroup;
  productReviews: string[] = []

  get reviews(): FormArray {
    return this.productForm.get('reviews') as FormArray;
  }

  constructor(private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.pattern(/\S+/)]],
      category: ['', [Validators.required, Validators.pattern(/\S+/)]],
      price: ['', [Validators.required, Validators.min(0.1)]],
      employee: [undefined, Validators.pattern(/\S+/)],
      description: [undefined, Validators.pattern(/\S+/)],
      reviews: [[]],
      review: [undefined, Validators.pattern(/\S+/)]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productValue = this.productForm.value;
      const newProduct: Product = {
        title: productValue.title,
        description: productValue.description,
        category: productValue.category,
        price: productValue.price,
        employee: productValue.employee,
        reviews: this.productReviews
      }
      this.addEvt.emit(newProduct);
    }
  }

  onCancel(): void {
    this.cancelEvt.emit();
    this.productForm.reset();
  }

  addReview(): void {
    this.productReviews.push(this.productForm.get('review')?.value);
    this.productForm.get('review')?.reset();
  }
  
  removeReview(index: number): void {
    this.productReviews.splice(index,1);
  }

}
