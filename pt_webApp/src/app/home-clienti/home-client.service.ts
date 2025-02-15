import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { iCliente } from '../interfaces/i-cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeClientService {
  constructor(private http: HttpClient) {}

  private clientUrl: string = environment.clienti;

  getProfile(): Observable<iCliente> {
    return this.http.get<iCliente>(`${this.clientUrl}`);
  }

  updateProfile(updatedCliente: Partial<iCliente>): Observable<iCliente> {
    return this.http.put<iCliente>(`${this.clientUrl}`, updatedCliente);
  }

  deleteProfile(): Observable<void> {
    return this.http.delete<void>(`${this.clientUrl}/delete`);
  }
}
