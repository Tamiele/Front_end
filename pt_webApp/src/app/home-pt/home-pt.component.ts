import { Component, OnInit } from '@angular/core';

import { iPersonalTrainer } from '../interfaces/i-personal-trainer';
import { AuthenticationService } from '../authentication/authentication.service';
import { iCliente } from '../interfaces/i-cliente';

@Component({
  selector: 'app-home-pt',
  templateUrl: './home-pt.component.html',
  styleUrls: ['./home-pt.component.scss'],
})
export class HomePtComponent implements OnInit {
  personalTrainer: iPersonalTrainer | null = null;
  clienti: iCliente[] = [];

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        console.log('👤 Utente loggato:', user);

        if ('clienti' in user) {
          console.log('📋 Clienti associati:', user.clienti);
        }
      } else {
        console.log('❌ Nessun utente trovato');
      }
    });
  }
}
