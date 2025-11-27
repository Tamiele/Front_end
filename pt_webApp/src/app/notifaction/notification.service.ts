import { Injectable } from '@angular/core';
import { UiToastService } from '../shared/services/ui-toast.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastService: UiToastService) {}

  showNotificationMessage(
    message: string,
    type: 'success' | 'error' | 'warning'
  ) {
    this.toastService.push(type, message);
  }
}
