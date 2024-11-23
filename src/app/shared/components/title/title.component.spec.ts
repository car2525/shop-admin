import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TitleComponent } from './title.component';
import { SharedModule } from '../../shared.module';

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleComponent ],
      imports: [SharedModule] 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the titleText input value in the template', () => {
    const testTitle = 'Test Title';
    component.titleText = testTitle;
    fixture.detectChanges();
    
    const titleElement = fixture.debugElement.query(By.css('.page-title')).nativeElement;
    expect(titleElement.textContent).toBe(testTitle);
  });

  it('should render the p-divider component', () => {
    const dividerElement = fixture.debugElement.query(By.css('p-divider'));
    expect(dividerElement).toBeTruthy();
  });
});
