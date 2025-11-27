import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastMessage, UiToastService } from '../../services/ui-toast.service';

@Component({
  selector: 'app-toast-stack',
  templateUrl: './toast-stack.component.html',
  styleUrls: ['./toast-stack.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastStackComponent {
  readonly toasts$: Observable<ToastMessage[]>;

  constructor(private toastService: UiToastService) {
    this.toasts$ = this.toastService.stream;
  }

  dismiss(id: number): void {
    this.toastService.dismiss(id);
  }
}
