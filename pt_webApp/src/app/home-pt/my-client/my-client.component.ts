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
  totalClienti: number = 0;
  currentPage: number = 0;

  page: number = 0;
  size: number = 10;

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
      console.log(this.clienti);
    });
  }
}
