import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'sa-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent {

  @Input() type: ChartType = 'bar'; //default bar
  @Input() data: ChartData | undefined;
  @Input() options: ChartOptions | undefined;
  @Input() responsive: boolean = true;
  @Input() style: object = { width: '100%', height: '400px' };

}
