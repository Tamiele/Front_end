import { EserciziComponent } from '../app/home-pt/esercizi/esercizi.component';

export const environment = {
  registerUrl: 'http://localhost:8080/api/auth/register',
  loginUrl: 'http://localhost:8080/api/auth/login',

  //personalTrainer
  clientFavPtUrl: 'http://localhost:8080/api/clienti/myClient',
  removeFavPt: 'http://localhost:8080/api/trainer/remove-client',
  searchClient: 'http://localhost:8080/api/clienti/search-clients-byTrainer',
  addClient: 'http://localhost:8080/api/trainer/assign-client',
  personalTrainer: 'http://localhost:8080/api/trainer',
  programmi: 'http://localhost:8080/api/programmi',
  esercizi: 'http://localhost:8080/api/exercises',
  workout: 'http://localhost:8080/api/weeks',
  workoutExercise: 'http://localhost:8080/api/workouts',
  //Clienti
};
