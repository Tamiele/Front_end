import { iWorkout } from './i-workout';

export interface iWeek {
  id?: number;
  weekNumber: number;
  workouts?: iWorkout[];
}
