import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { iCliente } from '../interfaces/i-cliente';
import { iPageClienti } from '../interfaces/i-page-clienti';

@Injectable({
  providedIn: 'root',
})
export class HomePtService {
  constructor(private http: HttpClient) {}

  private clientFavPtUrl: string = environment.clientFavPtUrl;

  // getMyClients(
  //   page: number = 0,
  //   size: number = 10
  // ): Observable<{ content: iCliente[]; totalElements: number }> {
  //   return this.http.get<{ content: iCliente[]; totalElements: number }>(
  //     `${this.clientFavPtUrl}?page=${page}&size=${size}`
  //   );
  // }

  getMyClients(page: number): Observable<iPageClienti> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', '12');

    return this.http.get<iPageClienti>(this.clientFavPtUrl, { params });
  }
}
