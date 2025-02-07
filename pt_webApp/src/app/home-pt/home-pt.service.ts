import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

import { iPageClienti } from '../interfaces/i-page-clienti';
import { iCliente } from '../interfaces/i-cliente';

@Injectable({
  providedIn: 'root',
})
export class HomePtService {
  constructor(private http: HttpClient) {}

  private clientFavPtUrl: string = environment.clientFavPtUrl;

  private removeFavPt: string = environment.removeFavPt;

  private searchClientUrl: string = environment.searchClient;

  private assignClientUrl: string = environment.addClient;

  getMyClients(page: number): Observable<iPageClienti> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', '12');

    return this.http.get<iPageClienti>(this.clientFavPtUrl, { params });
  }

  removeClient(clienteId: number): Observable<void> {
    const url = `${this.removeFavPt}/${clienteId}`;
    return this.http.delete<void>(url);
  }

  searchClientByTrainer(
    username?: string,
    email?: string
  ): Observable<iCliente> {
    let params = new HttpParams();
    if (username) params = params.set('username', username);
    if (email) params = params.set('email', email);

    return this.http.get<iCliente>(this.searchClientUrl, { params });
  }

  assignClientToTrainer(clienteId: number): Observable<void> {
    const url = `${this.assignClientUrl}/${clienteId}`;
    return this.http.post<void>(url, null);
  }
}
