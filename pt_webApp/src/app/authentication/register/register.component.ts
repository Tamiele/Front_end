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

      const requestData = {
        ...formData,
        roles,
      };

      delete requestData.isPersonalTrainer;

      this.authService.register(requestData).subscribe({
        next: () => {
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
