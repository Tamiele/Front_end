import { NotificationService } from './notification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifaction',
  templateUrl: './notifaction.component.html',
  styleUrl: './notifaction.component.scss',
})
export class NotifactionComponent implements OnInit {
  constructor(private ntfService: NotificationService) {}

  message: string = '';
  type: string = '';
  showMessage: boolean = false;
  ngOnInit(): void {
    this.ntfService.showNotification.subscribe((show) => {
      this.showMessage = show;
      this.message = this.ntfService.message;
      this.type = this.ntfService.type;
    });
  }
}
