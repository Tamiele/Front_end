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
  isLoggedIn$ = this.authSubject$.pipe(map((accessData) => !!accessData));

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUser();
  }

  /** Metodo per la registrazione */
  register(newUser: Partial<iUser>): Observable<iLoginResponse> {
    return this.http.post<iLoginResponse>(this.registerUrl, newUser);
  }

  /** Metodo per il login */
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

  /** Metodo per il logout */
  logout(): void {
    this.authSubject$.next(null);
    localStorage.removeItem('accessData');
    this.router.navigate(['/authentication/login']);
  }

  private autoLogoutTimer: any;

  /** Timer per il logout automatico */
  private autoLogout(tokenDate: Date): void {
    const tokenMs = tokenDate.getTime() - new Date().getTime();
    this.autoLogoutTimer = setTimeout(() => this.logout(), tokenMs);
  }

  /** Metodo per ripristinare l'utente al caricamento dell'app */
  restoreUser(): void {
    const userJson = localStorage.getItem('accessData');
    console.log('🔍 Recupero utente da localStorage:', userJson);

    if (!userJson) {
      console.log('❌ Nessun dato utente salvato.');
      return;
    }

    const accessData: iLoginResponse = JSON.parse(userJson);
    console.log('🔍 Dati di accesso recuperati:', accessData);

    if (this.jwtHelper.isTokenExpired(accessData.token)) {
      console.log('❌ Token scaduto, rimuovo dati utente.');
      localStorage.removeItem('accessData');
      return;
    }

    console.log('✅ Token valido, ripristino i dati utente...');
    this.authSubject$.next(accessData);
  }

  /** Metodo per ottenere l'utente attuale direttamente dall'observable */
  user$: Observable<iUser | undefined> = this.authSubject$.asObservable().pipe(
    tap((accessData) => (this.isLoggedIn = !!accessData)),
    map((accessData) => accessData?.user as iPersonalTrainer | iCliente)
  );
  isLoggedIn: boolean = false;
}
