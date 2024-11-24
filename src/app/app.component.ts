import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { STORE_ID } from './core/constants/constants';
import { GlobalFacade } from './core/services/global.facade';

@Component({
  selector: 'sa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {

  isLoading$ = this.globalFacade.isLoading$;
  spinnerStyle = { width: '100px', height: '100px' };
  
  constructor(private readonly globalFacade: GlobalFacade, private readonly cdr: ChangeDetectorRef) {
    this.globalFacade.persistIdStore(STORE_ID);
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
}
