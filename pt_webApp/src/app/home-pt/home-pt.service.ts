import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

import { iPageClienti } from '../interfaces/i-page-clienti';

@Injectable({
  providedIn: 'root',
})
export class HomePtService {
  constructor(private http: HttpClient) {}

  private clientFavPtUrl: string = environment.clientFavPtUrl;

  getMyClients(page: number): Observable<iPageClienti> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', '12');

    return this.http.get<iPageClienti>(this.clientFavPtUrl, { params });
  }
}
