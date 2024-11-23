import { Component, OnInit } from '@angular/core';
import { DashboardFacade } from './services/dashboard.facade';

@Component({
  selector: 'sa-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  storeName$ = this.dashboardFacade.storeName$;

  constructor(private readonly dashboardFacade: DashboardFacade) { }

  ngOnInit(): void {
    this.dashboardFacade.getStoreById();
  }

}
