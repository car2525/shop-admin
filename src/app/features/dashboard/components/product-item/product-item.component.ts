import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Product } from 'src/app/core/models/products';

@Component({
  selector: 'sa-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ProductItemComponent {

  @Input() product!: Product;
  @Input() layout: 'list' | 'grid' = 'list'; 
  @Output() deleteEvt = new EventEmitter<Product>();

  get productImage(): string {
    return `assets/sweet.jpg`;
  }

  constructor(private readonly confirmationService: ConfirmationService) {}

  deleteProduct(event: Event, product: Product) {
    this.confirmationService.close(); 
    this.confirmationService.confirm({
      key: product.id,
      target: event.target as HTMLElement,
      message: `Are you sure to delete product?`,
      icon: 'pi pi-exclamation-triangle',
      closeOnEscape: true,
      accept: () => {
        this.deleteEvt.emit(product);
      }
  });
  }
}
