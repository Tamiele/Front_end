import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authSvc: AuthenticationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessData = localStorage.getItem('accessData');

    if (!accessData) {
      this.authSvc.logout(); // Token non esiste → logout
      return next.handle(request);
    }

    const parsedAccessData = JSON.parse(accessData);
    const token = parsedAccessData.token;

    const newRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(newRequest).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.authSvc.logout(); // Token scaduto → logout
        }
        return throwError(() => error);
      })
    );
  }
}
