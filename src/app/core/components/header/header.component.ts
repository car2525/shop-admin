import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'sa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  menuItems: MenuItem[] = [];

  constructor() {}

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        routerLink: '/dashboard',
        tabindex: '0'
      },
      {
        label: 'Statistiche',
        icon: 'pi pi-fw pi-chart-bar',
        routerLink: '/statistics',
        tabindex: '1'
      }
    ];
  }

}
