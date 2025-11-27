import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-panel',
  templateUrl: './profile-panel.component.html',
  styleUrls: ['./profile-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePanelComponent {
  @Input() title = '';
  @Input() editable = false;
}
