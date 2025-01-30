import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authSvc: AuthenticationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessData = this.authSvc.authSubject$.getValue();
    console.log('Token recuperato:', accessData?.token); // 👀 Stampa il token per debug

    if (!accessData || !accessData.token) {
      console.warn(
        'Nessun token trovato, richiesta inviata senza Authorization'
      );
      return next.handle(request);
    }

    const newRequest = request.clone({
      headers: request.headers.set(
        'Authorization',
        `Bearer ${accessData.token}`
      ),
    });

    console.log(
      'Nuova richiesta con header:',
      newRequest.headers.get('Authorization')
    ); // 👀 Verifica se il token viene aggiunto

    return next.handle(newRequest);
  }
}
