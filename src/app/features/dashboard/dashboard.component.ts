import { Component, OnInit } from '@angular/core';
import { DashboardFacade } from './services/dashboard.facade';
import { Product } from 'src/app/core/models/products';

@Component({
  selector: 'sa-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  storeName$ = this.dashboardFacade.storeName$;
  products$ = this.dashboardFacade.productsOrderedByTitle$;
  storeEmployees$ = this.dashboardFacade.storeEmployees$;

  constructor(private readonly dashboardFacade: DashboardFacade) {}

  ngOnInit(): void {
    this.dashboardFacade.getStoreById();
    this.dashboardFacade.getProducts();
  }

  deleteProduct(productId: string): void {
    this.dashboardFacade.deleteProduct(productId);
  }

  saveProduct(product: Product): void {
    this.dashboardFacade.saveNewProduct(product);
  }

}
