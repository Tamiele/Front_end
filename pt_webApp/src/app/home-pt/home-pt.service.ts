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
import { iProgramResponseDTO } from '../interfaces/i-program-response-dto';

@Injectable({
  providedIn: 'root',
})
export class HomePtService {
  private clientFavPtUrl: string = environment.clientFavPtUrl;

  private removeFavPt: string = environment.removeFavPt;

  private searchClientUrl: string = environment.searchClient;

  private assignClientUrl: string = environment.addClient;

  private apiUrl: string = environment.personalTrainer;

  private programmi: string = environment.programmi;

  private esercizi: string = environment.esercizi;

  private workout: string = environment.workout;

  private workoutExercise: string = environment.workoutExercise;

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

  deleteProgram(programId: number): Observable<void> {
    return this.http.delete<void>(`${this.programmi}/${programId}`);
  }

  getMyPrograms(
    page: number,
    size: number = 6
  ): Observable<{
    content: iProgram[];
    totalPages: number;
    totalElements: number;
  }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<{
      content: iProgram[];
      totalPages: number;
      totalElements: number;
    }>(`${this.programmi}/my-programs`, { params });
  }

  assignProgramToClient(
    programId: number,
    clientId: number
  ): Observable<iProgramResponseDTO> {
    const url = `${this.programmi}/${programId}/assign/${clientId}`;

    return this.http.post<iProgramResponseDTO>(url, null);
  }

  createExercise(exercise: iExercise): Observable<iExercise> {
    return this.http.post<iExercise>(this.esercizi, exercise);
  }

  updateExercise(id: number, exercise: iExercise): Observable<iExercise> {
    return this.http.put<iExercise>(`${this.esercizi}/${id}`, exercise);
  }

  deleteExercise(id: number): Observable<void> {
    return this.http.delete<void>(`${this.esercizi}/${id}`);
  }
}
