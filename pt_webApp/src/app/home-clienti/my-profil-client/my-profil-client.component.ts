import { Component, OnInit } from '@angular/core';
import { HomeClientService } from '../home-client.service';
import { NotificationService } from '../../notifaction/notification.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { ModalService } from '../../modal/modal.service';
import { iCliente } from '../../interfaces/i-cliente';

@Component({
  selector: 'app-my-profil-client',
  templateUrl: './my-profil-client.component.html',
  styleUrl: './my-profil-client.component.scss',
})
export class MyProfilClientComponent implements OnInit {
  cliente: iCliente | null = null;
  isEditing: boolean = false;
  backupCliente: iCliente | null = null;

  showModal: boolean = false;

  constructor(
    private homeClientSvc: HomeClientService,
    private ntfService: NotificationService,
    private authService: AuthenticationService,
    private modalService: ModalService
  ) {}
  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.homeClientSvc.getProfile().subscribe({
      next: (data) => {
        this.cliente = data;
      },
      error: (err) => console.error('Errore nel recupero del profilo:', err),
    });
  }

  enableEdit(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    if (this.backupCliente) {
      this.cliente = { ...this.backupCliente }; // Ripristina il profilo originale
    }
    this.isEditing = false;
  }

  saveChanges(): void {
    if (this.cliente) {
      this.homeClientSvc.updateProfile(this.cliente).subscribe({
        next: (updated) => {
          this.cliente = updated;
          this.isEditing = false;
        },
        error: (err) => console.error('Errore durante l’aggiornamento:', err),
      });
    }
  }

  deleteAccount(): void {
    this.modalService.showModal(
      'Conferma Rimozione ',
      'Sei sicuro di voler il tuo Account? Tutti i Tuoi Progressi Andranno Persi!',
      () => {
        this.homeClientSvc.deleteProfile().subscribe({
          next: () => {
            this.ntfService.showNotificationMessage(
              'Profilo eliminato con successo!',
              'success'
            );

            setTimeout(() => {
              this.authService.logout();
            }, 2000);
          },
          error: (err) => {
            console.error('Errore durante l’eliminazione del profilo:', err);
            this.ntfService.showNotificationMessage(
              'Errore durante la cancellazione del profilo.',
              'error'
            );
          },
        });
      }
    );
  }
}
