import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { Product } from 'src/app/core/models/products';

@Component({
  selector: 'sa-product-view-container',
  templateUrl: './product-view-container.component.html',
  styleUrls: ['./product-view-container.component.scss']
})
export class ProductViewContainerComponent {
  @Input() storeName: string = '';
  @Input() products: Product[] = [];
  @Input() storeEmployees: string[] = []; 
  @Output() onAddProductEvt = new EventEmitter<Product>();
  @Output() onDeleteProductEvt = new EventEmitter<string>()

  isDialogVisible = false;
  rows: number = 6;
  layout: 'list' | 'grid' = 'list';

  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;
  sortKey!: string;

  constructor() { }

  ngOnInit(): void {
    this.sortOptions = [
      { label: 'Title Low to High', value: 'title' },
      { label: 'Title High to Low', value: '!title' }
    ];
  }

  onSortChange(event: DropdownChangeEvent) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}

  deleteProduct(productId: string): void {
    this.onDeleteProductEvt.emit(productId);
  }

  onProductAdded(product: Product): void {
    this.onAddProductEvt.emit(product);
    this.hideDialog();
  }

  showDialog(): void {
    this.isDialogVisible = true;
  }

  hideDialog(): void {
    this.isDialogVisible = false;
  }

  onPageChange(dataView: DataView) {
    // Scorri fino al primo elemento della lista
    if (dataView) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
