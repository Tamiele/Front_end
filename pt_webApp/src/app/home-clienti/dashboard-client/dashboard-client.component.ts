import { Component, OnInit } from '@angular/core';
import { iCliente } from '../../interfaces/i-cliente';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrl: './dashboard-client.component.scss',
})
export class DashboardClientComponent implements OnInit {
  cliente: iCliente | null = null;

  constructor(private authService: AuthenticationService) {}
  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user && 'roles' in user && user.roles?.includes('ROLE_USER')) {
        this.cliente = user as iCliente;
      }
    });
    console.log(this.cliente);
  }
}
