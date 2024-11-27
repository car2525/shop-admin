import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { StatisticsFacade } from './services/statistics.facade';
import { StatsCategories } from 'src/app/core/api/models/statsCategories';
import { Subscription } from 'rxjs';
import { generateRandomColor } from 'src/app/shared/utils/funtions';
import { GlobalFacade } from 'src/app/core/services/global.facade';

@Component({
  selector: 'sa-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy {

  storeName$ = this.globalFacade.storeName$;
  private subs: Subscription = new Subscription();

  chartData!: ChartData; 
  chartOptions!: ChartOptions;
  loadingChart: boolean = true;

  storeName: string = '';

  constructor(private readonly statisticsFacade: StatisticsFacade, private readonly globalFacade: GlobalFacade) {}

  ngOnInit(): void {
    this.statisticsFacade.getStatsCategoriesById();
    
    this.subs.add(this.statisticsFacade.statisticsCategories$.subscribe(
      (categories: StatsCategories[]) => {
        this.updateChartData(categories); 
      }
    ));

    this.subs.add(this.storeName$.subscribe(
      (storeName: string) => {
        this.storeName = storeName;
      }
    ));
  }

  ngOnDestroy(): void {
      this.subs?.unsubscribe();
  }

  private updateChartData(statsCategories: StatsCategories[]): void {
    this.loadingChart = true;
    const labels = statsCategories.map(statsCat => statsCat.category);
    const data = statsCategories.map(statsCat => statsCat.numberOfProducts);
    const randomBackgroundColors = statsCategories.map(_ => generateRandomColor());

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: this.storeName,
          data: data,
          fill: false,
          borderColor: '#42A5F5',
          backgroundColor: randomBackgroundColors,
          tension: 0.4
        }
      ]
    };

    this.chartOptions = {
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'X Axis'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Y Axis'
          }
        }
      }
    }

    this.loadingChart = false;
  }


}