import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'sa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuItems: MenuItem[] = [];

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        routerLink: '/dashboard'
      },
      {
        label: 'Statistiche',
        icon: 'pi pi-fw pi-chart-bar',
        routerLink: '/statistics'
      }
    ];
  }
}
