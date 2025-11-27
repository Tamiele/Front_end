import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-surface-card',
  templateUrl: './surface-card.component.html',
  styleUrls: ['./surface-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurfaceCardComponent {
  @Input() hoverable = false;
  @Input() padding: 'sm' | 'md' | 'lg' = 'md';
  @Input() role: string | null = null;

  @HostBinding('class.surface-card')
  baseClass = true;

  @HostBinding('class.surface-card--hoverable')
  get hoverClass(): boolean {
    return this.hoverable;
  }

  @HostBinding('class.surface-card--padding-sm')
  get paddingSm(): boolean {
    return this.padding === 'sm';
  }

  @HostBinding('class.surface-card--padding-md')
  get paddingMd(): boolean {
    return this.padding === 'md';
  }

  @HostBinding('class.surface-card--padding-lg')
  get paddingLg(): boolean {
    return this.padding === 'lg';
  }

  @HostBinding('attr.role')
  get ariaRole(): string | null {
    return this.role;
  }
}
