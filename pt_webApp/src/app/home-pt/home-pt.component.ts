import { Component, OnInit } from '@angular/core';

import { iPersonalTrainer } from '../interfaces/i-personal-trainer';
import { AuthenticationService } from '../authentication/authentication.service';
import { iCliente } from '../interfaces/i-cliente';
import { HomePtService } from './home-pt.service';

@Component({
  selector: 'app-home-pt',
  templateUrl: './home-pt.component.html',
  styleUrls: ['./home-pt.component.scss'],
})
export class HomePtComponent implements OnInit {
  personalTrainer: iPersonalTrainer | null = null;
  clienti: iCliente[] = [];
  totalClienti: number = 0;
  currentPage: number = 0;

  page: number = 0;
  size: number = 10;

  constructor(
    private authService: AuthenticationService,
    private homePt: HomePtService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (
        user &&
        'roles' in user &&
        user.roles.includes('ROLE_PERSONAL_TRAINER')
      ) {
        this.personalTrainer = user as iPersonalTrainer;
      }
      this.getAll();
    });
  }

  getAll(): void {
    this.homePt.getMyClients(this.currentPage).subscribe((pageClienti) => {
      this.clienti = pageClienti.content;
      console.log(this.clienti);
    });
  }

  nextPage(): void {
    if ((this.page + 1) * this.size < this.totalClienti) {
      this.page++;
      this.getAll();
    }
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.getAll();
    }
  }
}
