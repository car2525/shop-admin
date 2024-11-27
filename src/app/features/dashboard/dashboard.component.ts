import { Component, OnInit } from '@angular/core';
import { DashboardFacade } from './services/dashboard.facade';
import { Product } from 'src/app/core/models/products';
import { GlobalFacade } from 'src/app/core/services/global.facade';

@Component({
  selector: 'sa-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  storeName$ = this.globalFacade.storeName$;
  storeEmployees$ = this.globalFacade.storeEmployees$;
  products$ = this.dashboardFacade.productsOrderedByTitle$;

  constructor(private readonly dashboardFacade: DashboardFacade, private readonly globalFacade: GlobalFacade) {}

  ngOnInit(): void {
    this.dashboardFacade.getProducts();
  }

  deleteProduct(productId: string): void {
    this.dashboardFacade.deleteProduct(productId);
  }

  saveProduct(product: Product): void {
    this.dashboardFacade.saveNewProduct(product);
  }

}
