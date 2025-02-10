import { NotificationService } from './../../notifaction/notification.service';
import { Component, OnInit } from '@angular/core';
import { HomePtService } from '../home-pt.service';
import { iPersonalTrainer } from '../../interfaces/i-personal-trainer';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-my-profil',
  templateUrl: './my-profil.component.html',
  styleUrl: './my-profil.component.scss',
})
export class MyProfilComponent implements OnInit {
  trainer: iPersonalTrainer | null = null;
  isEditing: boolean = false;
  backupTrainer: iPersonalTrainer | null = null;

  showModal: boolean = false;

  constructor(
    private homePtsvc: HomePtService,
    private router: Router,
    private ntfService: NotificationService,
    private authService: AuthenticationService
  ) {}
  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.homePtsvc.getProfile().subscribe({
      next: (data) => {
        this.trainer = data;
      },
      error: (err) => console.error('Errore nel recupero del profilo:', err),
    });
  }

  enableEdit(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    if (this.backupTrainer) {
      this.trainer = { ...this.backupTrainer }; // Ripristina il profilo originale
    }
    this.isEditing = false;
  }

  saveChanges(): void {
    if (this.trainer) {
      this.homePtsvc.updateProfile(this.trainer).subscribe({
        next: (updated) => {
          this.trainer = updated;
          this.isEditing = false;
        },
        error: (err) => console.error('Errore durante l’aggiornamento:', err),
      });
    }
  }

  deleteAccount(): void {
    this.homePtsvc.deleteProfile().subscribe({
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

    this.closeModal();
  }

  // modale rimozione cliente
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
