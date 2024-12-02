import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'sa-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {
  @Input() titleText = '';
}
