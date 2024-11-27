import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';
import { ChartModule } from 'primeng/chart';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartComponent],
      imports: [ChartModule]
    });
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize inputs with default values', () => {
    expect(component.type).toBe('bar'); // Default value
    expect(component.responsive).toBeTrue();
    expect(component.style).toEqual({ width: '100%', height: '400px' });
    expect(component.data).toBeUndefined();
    expect(component.options).toBeUndefined();
  });
});
