import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}

  // Notifica dinamica
  private notificationMessage: string = '';
  private notificationType: 'success' | 'error' | 'warning' = 'error';
  showNotification = new BehaviorSubject<boolean>(false);

  showNotificationMessage(
    message: string,
    type: 'success' | 'error' | 'warning'
  ) {
    this.notificationMessage = message;
    this.notificationType = type;
    this.showNotification.next(true);

    setTimeout(() => {
      this.removeNotificationMessage();
    }, 3000);
  }

  public get message(): string {
    return this.notificationMessage;
  }

  public get type(): string {
    return this.notificationType;
  }

  removeNotificationMessage() {
    this.showNotification.next(false);
  }
}
