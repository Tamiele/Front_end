export interface iProgramResponseDTO {
  id: number;
  name: string;
  description: string;
  template: boolean;
  assigned: boolean;

  weeks?: WeekDTO[];
}

export interface WeekDTO {
  id: number;
  weekNumber: number;
  workouts?: WorkoutDTO[];
}

export interface WorkoutDTO {
  id: number;
  name: string;
  completed: boolean;
  dayOfWeek: number;
  exercises?: WorkoutExerciseDTO[];
}

export interface WorkoutExerciseDTO {
  id: number;
  sets: number;
  reps: number;
  restType: string;
  restValue: number;
  weight: number;
  exercise?: ExerciseDTO;
}

export interface ExerciseDTO {
  id: number;
  name: string;
  nameEn?: string;
  muscleGroup: string;
  description: string;
  descriptionEn?: string;
}
