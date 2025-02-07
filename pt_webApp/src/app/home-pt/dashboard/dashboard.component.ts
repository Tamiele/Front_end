import { Component, OnInit } from '@angular/core';
import { iPersonalTrainer } from '../../interfaces/i-personal-trainer';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  personalTrainer: iPersonalTrainer | null = null;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (
        user &&
        'roles' in user &&
        user.roles?.includes('ROLE_PERSONAL_TRAINER')
      ) {
        this.personalTrainer = user as iPersonalTrainer;
      }
    });
  }
}
