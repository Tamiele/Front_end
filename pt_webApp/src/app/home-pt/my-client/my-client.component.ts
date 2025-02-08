import { Component, OnInit } from '@angular/core';
import { iCliente } from '../../interfaces/i-cliente';
import { AuthenticationService } from '../../authentication/authentication.service';
import { HomePtService } from '../home-pt.service';
import { iPersonalTrainer } from '../../interfaces/i-personal-trainer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-client',
  templateUrl: './my-client.component.html',
  styleUrl: './my-client.component.scss',
})
export class MyClientComponent implements OnInit {
  personalTrainer: iPersonalTrainer | null = null;
  clienti: iCliente[] = [];

  searchTerm: string = '';
  totalClienti: number = 0;
  currentPage: number = 0;

  // Cliente da eliminare
  selectedClientId: number | null = null;
  showModal: boolean = false;

  // Variabili per la ricerca
  searchUsername: string = '';
  searchEmail: string = '';
  searchedClient: iCliente | null = null;
  clientHasTrainer: boolean = false;

  // Notifica dinamica
  notificationMessage: string = '';
  notificationType: 'success' | 'error' | 'warning' = 'error';
  showNotification: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private homePtsvc: HomePtService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.homePtsvc.getMyClients(this.currentPage).subscribe((pageClienti) => {
      this.clienti = pageClienti.content;
      this.totalClienti = pageClienti.totalElements;
    });
  }
  //rimozione cliente dai preferiti
  removeClient(): void {
    if (this.selectedClientId !== null) {
      this.homePtsvc.removeClient(this.selectedClientId).subscribe(
        () => {
          this.clienti = this.clienti.filter(
            (cliente) => cliente.id !== this.selectedClientId
          );
          this.totalClienti--;
          this.closeModal();
          this.showNotificationMessage(
            'Cliente rimosso con successo!',
            'success'
          );
        },
        (error) => {
          console.error('Errore durante la rimozione del cliente:', error);
          this.showNotificationMessage(
            'Errore durante la rimozione del cliente.',
            'error'
          );
        }
      );
    }
  }

  // modale rimozione cliente
  openModal(clientId: number) {
    this.selectedClientId = clientId;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  get filteredClienti(): iCliente[] {
    return this.clienti.filter(
      (cliente) =>
        cliente.nome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        cliente.cognome.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  searchClient() {
    if (!this.searchUsername && !this.searchEmail) {
      this.showNotificationMessage(
        'Inserisci almeno un parametro di ricerca.',
        'warning'
      );
      return;
    }

    this.homePtsvc
      .searchClientByTrainer(this.searchUsername, this.searchEmail)
      .subscribe({
        next: (response) => {
          if (response.personalTrainerId) {
            this.showNotificationMessage(
              'Il Cliente non è disponibile.',
              'error'
            );
            this.searchedClient = null;
          } else {
            this.searchedClient = response;
            this.clientHasTrainer = false;
          }
        },
        error: (error) => {
          console.error('Errore durante la ricerca del cliente:', error);
          this.showNotificationMessage(
            'Il Cliente non è disponibile.',
            'error'
          );
        },
      });
  }

  addClient(clientId: number) {
    this.homePtsvc.assignClientToTrainer(clientId).subscribe({
      next: () => {
        this.showNotificationMessage(
          'Cliente assegnato con successo!',
          'success'
        );
        this.searchedClient = null;
        this.getAll();
      },
      error: (error) => {
        console.error('Errore durante l’assegnazione del cliente:', error);
        this.showNotificationMessage(
          'Errore durante l’assegnazione del cliente.',
          'error'
        );
      },
    });
  }

  showNotificationMessage(
    message: string,
    type: 'success' | 'error' | 'warning'
  ) {
    this.notificationMessage = message;
    this.notificationType = type;
    this.showNotification = true;

    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }

  closeSearchedClient() {
    this.searchedClient = null;
  }
}
