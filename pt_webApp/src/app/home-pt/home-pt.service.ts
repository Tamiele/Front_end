import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

import { iPageClienti } from '../interfaces/i-page-clienti';
import { iCliente } from '../interfaces/i-cliente';
import { iPersonalTrainer } from '../interfaces/i-personal-trainer';
import { iProgram } from '../interfaces/i-program';
import { iExercise } from '../interfaces/i-exercise';
import { iWeek } from '../interfaces/i-week';
import { iWorkout } from '../interfaces/i-workout';
import { iWorkoutExercise } from '../interfaces/i-workout-exercise';

@Injectable({
  providedIn: 'root',
})
export class HomePtService {
  private clientFavPtUrl: string = environment.clientFavPtUrl;

  private removeFavPt: string = environment.removeFavPt;

  private searchClientUrl: string = environment.searchClient;

  private assignClientUrl: string = environment.addClient;

  private apiUrl = environment.personalTrainer;

  private programmi = environment.programmi;

  private esercizi = environment.esercizi;

  private workout = environment.workout;

  private workoutExercise = environment.workoutExercise;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<iPersonalTrainer> {
    return this.http.get<iPersonalTrainer>(`${this.apiUrl}`);
  }

  updateProfile(
    updatedTrainer: Partial<iPersonalTrainer>
  ): Observable<iPersonalTrainer> {
    return this.http.put<iPersonalTrainer>(`${this.apiUrl}`, updatedTrainer);
  }

  deleteProfile(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete`);
  }

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

  createProgram(program: iProgram): Observable<iProgram> {
    return this.http.post<iProgram>(`${this.programmi}`, program);
  }

  getAllExercises(): Observable<iExercise[]> {
    return this.http.get<iExercise[]>(`${this.esercizi}`);
  }

  // home-pt.service.ts
  addWeekToProgram(programId: number, week: iWeek): Observable<iWeek> {
    // Assicurati che il payload abbia almeno la proprietà "weekNumber"
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<iWeek>(`${this.programmi}/${programId}/weeks`, week, {
      headers,
    });
  }

  //Aggiunge Workout a una Settimana
  addWorkoutToWeek(
    weekId: number,
    workout: Partial<iWorkout>
  ): Observable<iWorkout> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<iWorkout>(
      `${this.workout}/${weekId}/workouts`,
      workout,
      { headers }
    );
  }

  //Aggiunge Esercizi a un Workout
  addExerciseToWorkout(
    workoutId: number,
    workoutExercise: any
  ): Observable<iWorkoutExercise> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<iWorkoutExercise>(
      `${this.workoutExercise}/${workoutId}/exercises`,
      workoutExercise,
      { headers }
    );
  }

  getExercisesByMuscleGroup(muscleGroup: string): Observable<iExercise[]> {
    const params = new HttpParams().set('muscleGroup', muscleGroup);
    return this.http.get<iExercise[]>(`${this.esercizi}`, { params });
  }
}
