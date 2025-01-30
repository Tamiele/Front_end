import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { iUser } from '../interfaces/i-user';
import { iLoginRequest } from '../interfaces/i-login-request';
import { iLoginResponse } from '../interfaces/i-login-response';
import { iCliente } from '../interfaces/i-cliente';
import { iPersonalTrainer } from '../interfaces/i-personal-trainer';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  jwtHelper: JwtHelperService = new JwtHelperService();

  // URL delle API
  registerUrl: string = environment.registerUrl;
  loginUrl: string = environment.loginUrl;

  // Gestione stato autenticazione
  authSubject$ = new BehaviorSubject<iLoginResponse | null>(null);

  // Observable per i dati utente loggato

  private userSubject$ = new BehaviorSubject<
    iPersonalTrainer | iCliente | null
  >(null);

  user$: Observable<iPersonalTrainer | iCliente | null> =
    this.userSubject$.asObservable();

  // Observable per lo stato di login
  isLoggedIn$ = this.authSubject$.pipe(map((accessData) => !!accessData));

  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUser();
  }

  // Metodo per la registrazione
  register(newUser: Partial<iUser>): Observable<iLoginResponse> {
    return this.http.post<iLoginResponse>(this.registerUrl, newUser);
  }

  // Metodo per il login
  login(authenticationData: iLoginRequest): Observable<iLoginResponse> {
    return this.http
      .post<iLoginResponse>(this.loginUrl, authenticationData)
      .pipe(
        tap((accessData) => {
          if (!accessData.token) {
            console.error('🚫 ERRORE: Nessun token ricevuto!');
            return;
          }

          this.authSubject$.next(accessData);
          localStorage.setItem('accessData', JSON.stringify(accessData));

          const tokenDate = this.jwtHelper.getTokenExpirationDate(
            accessData.token
          );

          if (tokenDate) {
            this.autoLogout(tokenDate);
          }
        })
      );
  }

  // Metodo per il logout
  logout(): void {
    this.authSubject$.next(null);
    localStorage.removeItem('accessData');
    this.router.navigate(['/authentication/login']);
  }

  private autoLogoutTimer: any;

  // Timer per il logout automatico
  autoLogout(tokenDate: Date): void {
    const tokenMs = tokenDate.getTime() - new Date().getTime();

    this.autoLogoutTimer = setTimeout(() => {
      this.logout();
    }, tokenMs);
  }

  // Metodo per ripristinare l'utente al caricamento dell'app
  private restoreUser(): void {
    const userJson = localStorage.getItem('accessData');
    if (!userJson) return;

    const accessData: iLoginResponse = JSON.parse(userJson);

    // Controlla se il token è scaduto
    if (this.jwtHelper.isTokenExpired(accessData.token)) {
      localStorage.removeItem('accessData');
      return;
    }

    this.authSubject$.next(accessData);
  }
}
