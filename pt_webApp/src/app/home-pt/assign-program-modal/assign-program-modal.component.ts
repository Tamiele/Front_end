import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HomePtService } from '../home-pt.service';
import { NotificationService } from '../../notifaction/notification.service';
import { iCliente } from '../../interfaces/i-cliente';

@Component({
  selector: 'app-assign-program-modal',
  templateUrl: './assign-program-modal.component.html',
  styleUrls: ['./assign-program-modal.component.scss'],
})
export class AssignProgramModalComponent implements OnInit {
  @Input() programId!: number; // Il programma da assegnare
  @Output() closed = new EventEmitter<boolean>();

  clients: iCliente[] = [];
  loading: boolean = false;

  constructor(
    private homePtService: HomePtService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.loading = true;

    this.homePtService.getMyClients(0).subscribe({
      next: (response) => {
        this.clients = response.content;
        this.loading = false;
      },
      error: (err) => {
        this.notificationService.showNotificationMessage(
          'Errore nel caricamento dei clienti',
          'error'
        );
        this.loading = false;
      },
    });
  }

  assignClient(clientId: number): void {
    this.homePtService
      .assignProgramToClient(this.programId, clientId)
      .subscribe({
        next: (response) => {
          this.notificationService.showNotificationMessage(
            'Programma assegnato con successo!',
            'success'
          );
          this.close();
        },
        error: (err) => {
          this.notificationService.showNotificationMessage(
            "Errore durante l'assegnazione del programma",
            'error'
          );
        },
      });
  }

  close(): void {
    this.closed.emit(true);
  }
}
