import { Component, OnInit } from '@angular/core';
import { iCliente } from '../../interfaces/i-cliente';
import { AuthenticationService } from '../../authentication/authentication.service';
import { HomePtService } from '../home-pt.service';
import { iPersonalTrainer } from '../../interfaces/i-personal-trainer';

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

  removeClient(id: number): void {
    this.homePtsvc.removeClient(id).subscribe(
      () => {
        this.clienti = this.clienti.filter((cliente) => cliente.id !== id);
        this.totalClienti--;
      },
      (error) => {
        console.error('Errore durante la rimozione del cliente:', error);
      }
    );
  }

  get filteredClienti(): iCliente[] {
    return this.clienti.filter(
      (cliente) =>
        cliente.nome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        cliente.cognome.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
