import { Component, Input, ViewChild } from '@angular/core';
import { Product } from 'src/app/core/models/products';
import { DataView } from 'primeng/dataview';

@Component({
  selector: 'sa-product-view-container',
  templateUrl: './product-view-container.component.html',
  styleUrls: ['./product-view-container.component.scss']
})
export class ProductViewContainerComponent {
  @Input() products!: Product[];
  @Input() layout: "list" | "grid" = 'list';
  @Input() rows!: number;

  onPageChange(dataView: DataView) {
    // Scorri fino al primo elemento della lista
    if (dataView) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onAdd() {
    console.log('click');
  }

}
