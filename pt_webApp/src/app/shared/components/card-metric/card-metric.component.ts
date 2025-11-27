import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-metric',
  templateUrl: './card-metric.component.html',
  styleUrls: ['./card-metric.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardMetricComponent {
  @Input() label = '';
  @Input() value: string | number = '';
  @Input() description = '';
  @Input() icon: string | null = null;
  @Input() routerLink: string | any[] | null = null;
  @Input() variant: 'primary' | 'accent' | 'neutral' = 'neutral';
}
