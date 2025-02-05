import { Component, OnInit } from '@angular/core';

import { iPersonalTrainer } from '../interfaces/i-personal-trainer';
import { AuthenticationService } from '../authentication/authentication.service';

import { HomePtService } from './home-pt.service';

@Component({
  selector: 'app-home-pt',
  templateUrl: './home-pt.component.html',
  styleUrls: ['./home-pt.component.scss'],
})
export class HomePtComponent {
  personalTrainer: iPersonalTrainer | null = null;
}
