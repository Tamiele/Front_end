import { iWorkoutExercise } from './i-workout-exercise';

export interface iWorkout {
  id?: number;
  name: string;
  completed: boolean;
  dayOfWeek: number;
  exercises?: iWorkoutExercise[];
}
