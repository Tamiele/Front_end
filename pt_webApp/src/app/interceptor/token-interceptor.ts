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
    const accessData = this.authSvc.authSubject$.getValue();
    if (!accessData) {
      return next.handle(request);
    }

    const newRequest = request.clone({
      headers: request.headers.append(
        'Authorization',
        `Bearer ${accessData.token}`
      ),
    });

    return next.handle(newRequest).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.authSvc.logout();
        }
        return throwError(() => error);
      })
    );
  }
}
