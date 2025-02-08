import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // Inizializza il form
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (user) => {
          if (user && user.user.roles) {
            if (user.user.roles.includes('ROLE_PERSONAL_TRAINER')) {
              this.router.navigate(['/HomePt/dashboard']); // Rotta per Personal Trainer
            } else {
              this.router.navigate(['/HomeClienti']); // Rotta per Clienti o altro ruolo
            }
          } else {
            this.errorMessage = 'Errore nel recupero del ruolo utente.';
          }
        },
        error: (err) => {
          this.errorMessage = 'Credenziali non valide. Riprova.';
          console.error(err);
        },
      });
    }
  }
}
