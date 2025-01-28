import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { iUser } from '../../interfaces/i-user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      nome: ['', [Validators.required]],
      cognome: ['', [Validators.required]],
      dataDiNascita: ['', [Validators.required]],
      isPersonalTrainer: [false],
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      // Imposta il ruolo in base alla checkbox
      const roles = formData.isPersonalTrainer
        ? ['ROLE_PERSONAL_TRAINER']
        : ['ROLE_USER'];

      // Prepara i dati da inviare al server
      const requestData = {
        ...formData,
        roles, // Aggiunge il ruolo dinamico
      };

      delete requestData.isPersonalTrainer; // Rimuove il campo non necessario

      this.authService.register(requestData).subscribe({
        next: (response) => {
          this.successMessage = response.message; // Mostra il messaggio di successo
          setTimeout(() => {
            this.router.navigate(['/authentication/login']);
          }, 2000);
        },
        error: (err) => {
          this.errorMessage =
            err.error.message || 'Errore durante la registrazione. Riprova.';
          console.error(err);
        },
      });
    }
  }
}
