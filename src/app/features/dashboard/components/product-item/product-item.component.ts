import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from 'src/app/core/models/products';

@Component({
  selector: 'sa-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent {

  @Input() product!: Product;
  @Input() layout: 'list' | 'grid' = 'list'; 

  get productImage(): string {
    return `assets/sweet.jpg`;
  }
}
