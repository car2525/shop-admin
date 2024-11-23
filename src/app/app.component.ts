import { Component } from '@angular/core';
import { AppFacade } from './core/services/app.facade';
import { STORE_ID } from './core/constants/constants';

@Component({
  selector: 'sa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private readonly appFacade: AppFacade) {
    this.appFacade.persistIdStore(STORE_ID);
  }
}
