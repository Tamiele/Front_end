import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { iExercise } from '../../interfaces/i-exercise';
import { iProgram } from '../../interfaces/i-program';
import { iWeek } from '../../interfaces/i-week';
import { iWorkout } from '../../interfaces/i-workout';
import { iWorkoutExercise } from '../../interfaces/i-workout-exercise';
import { HomePtService } from '../home-pt.service';
import { NotificationService } from '../../notifaction/notification.service';
import { ModalService } from '../../modal/modal.service';
import { iProgramResponseDTO } from '../../interfaces/i-program-response-dto';

@Component({
  selector: 'app-programmi',
  templateUrl: './programmi.component.html',
  styleUrls: ['./programmi.component.scss'],
})
export class ProgrammiComponent implements OnInit {
  programForm!: FormGroup;
  step: number = 1;
  programId!: number;
  exercises: iExercise[] = [];
  selectedMuscleGroup: string = '';

  //paginazione lista programmi
  programs: iProgram[] = [];
  currentPage: number = 0;
  totalPages: number = 1;
  totalElements: number = 0;
  pageSize: number = 6;

  assignPrograms: iProgramResponseDTO[] = [];

  assignModalVisible: boolean = false;
  selectedProgramIdForAssignment: number | null = null;

  constructor(
    private fb: FormBuilder,
    private homePtSvc: HomePtService,
    private notificationService: NotificationService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.programForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      template: [false],
      weeksCount: [1, [Validators.required, Validators.min(1)]],
      weeks: this.fb.array([]),
    });
    this.loadExercises();
    this.loadPrograms();
  }

  loadPrograms(): void {
    this.homePtSvc.getMyPrograms(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.programs = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
      },
      error: () => {
        this.notificationService.showNotificationMessage(
          'Errore nel caricamento dei programmi!',
          'error'
        );
      },
    });
  }

  // Navigazione paginazione
  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadPrograms();
    }
  }

  deleteProgram(programId: number | undefined): void {
    if (programId === undefined) {
      this.notificationService.showNotificationMessage(
        'Errore: ID del programma non valido!',
        'error'
      );
      return;
    }

    this.modalService.showModal(
      'Conferma Eliminazione',
      'Sei sicuro di voler eliminare questo programma?',
      () => {
        this.homePtSvc.deleteProgram(programId).subscribe({
          next: () => {
            this.notificationService.showNotificationMessage(
              'Programma eliminato con successo!',
              'success'
            );
            this.loadPrograms();
          },
          error: () => {
            this.notificationService.showNotificationMessage(
              'Errore durante l’eliminazione del programma!',
              'error'
            );
          },
        });
      }
    );
  }

  get weeks(): FormArray {
    return this.programForm.get('weeks') as FormArray;
  }

  loadExercises(): void {
    if (
      this.selectedMuscleGroup &&
      this.selectedMuscleGroup.trim().length > 0
    ) {
      this.homePtSvc
        .getExercisesByMuscleGroup(this.selectedMuscleGroup)
        .subscribe((data) => {
          this.exercises = data;
        });
    } else {
      this.homePtSvc.getAllExercises().subscribe((data) => {
        this.exercises = data;
      });
    }
  }

  onMuscleGroupChange(): void {
    this.loadExercises();
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }

  createProgram(): void {
    if (this.programForm.invalid) {
      this.notificationService.showNotificationMessage(
        'Compila tutti i campi richiesti prima di procedere!',
        'warning'
      );
      return;
    }
    this.homePtSvc.createProgram(this.programForm.value).subscribe({
      next: (program: iProgram) => {
        if (!program || !program.id) {
          this.notificationService.showNotificationMessage(
            'Errore: Il Programma non è stato creato correttamente.',
            'error'
          );
          return;
        }
        this.programId = program.id;
        this.notificationService.showNotificationMessage(
          'Programma creato con successo!',
          'success'
        );
        this.nextStep();
      },
      error: () => {
        this.notificationService.showNotificationMessage(
          'Errore durante la creazione del programma.',
          'error'
        );
      },
    });
  }

  createWeeks(): void {
    if (!this.programId) {
      this.notificationService.showNotificationMessage(
        'Errore: Il Programma non è stato creato correttamente.',
        'error'
      );
      return;
    }
    const weeksCount: number = this.programForm.value.weeksCount;
    const weekObservables: Observable<iWeek>[] = Array.from(
      { length: weeksCount },
      (_, index) => {
        const weekData: iWeek = { weekNumber: index + 1, workouts: [] };
        return this.homePtSvc.addWeekToProgram(this.programId, weekData);
      }
    );
    forkJoin(weekObservables).subscribe({
      next: (createdWeeks: iWeek[]) => {
        this.weeks.clear();
        createdWeeks.forEach((week: iWeek) => {
          this.weeks.push(
            this.fb.group({
              id: [week.id],
              weekNumber: [week.weekNumber],
              workouts: this.fb.array([]),
            })
          );
        });
        this.notificationService.showNotificationMessage(
          'Settimane aggiunte con successo!',
          'success'
        );
        this.nextStep();
      },
      error: () => {
        this.notificationService.showNotificationMessage(
          'Errore durante la creazione delle settimane.',
          'error'
        );
      },
    });
  }

  getWorkoutsControls(weekIndex: number): FormGroup[] {
    const weekGroup: FormGroup = this.weeks.at(weekIndex) as FormGroup;
    return (weekGroup.get('workouts') as FormArray).controls as FormGroup[];
  }

  createWorkouts(): void {
    const weekWorkoutObservables: Observable<{
      weekIndex: number;
      workouts: iWorkout[];
    }>[] = [];
    this.weeks.controls.forEach((weekCtrl: AbstractControl, index: number) => {
      const weekGroup = weekCtrl as FormGroup;
      const weekId: number = weekGroup.value.id;
      const weekNumber: number = weekGroup.value.weekNumber;
      const workoutObservables: Observable<iWorkout>[] = Array.from(
        { length: weekNumber },
        (_, i: number) => {
          const workoutData: Partial<iWorkout> = {
            name: `Workout ${i + 1}`,
            completed: false,
            dayOfWeek: 0,
          };
          return this.homePtSvc.addWorkoutToWeek(weekId, workoutData);
        }
      );
      const weekObs = forkJoin(workoutObservables).pipe(
        map((createdWorkouts: iWorkout[]) => ({
          weekIndex: index,
          workouts: createdWorkouts,
        }))
      );
      weekWorkoutObservables.push(weekObs);
    });
    forkJoin(weekWorkoutObservables).subscribe({
      next: (results) => {
        results.forEach((result) => {
          const weekGroup = this.weeks.at(result.weekIndex) as FormGroup;
          const workoutsArray = weekGroup.get('workouts') as FormArray;
          workoutsArray.clear();
          result.workouts.forEach((workout: iWorkout) => {
            workoutsArray.push(
              this.fb.group({
                id: [workout.id],
                name: [workout.name],
                exercises: this.fb.array([]),
              })
            );
          });
        });
        this.notificationService.showNotificationMessage(
          'Workout aggiunti con successo!',
          'success'
        );
        this.nextStep();
      },
      error: () => {
        this.notificationService.showNotificationMessage(
          'Errore durante la creazione dei workout.',
          'error'
        );
      },
    });
  }

  toggleExercise(workoutCtrl: FormGroup, exercise: iExercise): void {
    const exercisesArray = workoutCtrl.get('exercises') as FormArray;
    const existingIndex = exercisesArray.controls.findIndex(
      (control) => control.value.exerciseId === exercise.id
    );
    if (existingIndex >= 0) {
      exercisesArray.removeAt(existingIndex);

      const exIndex = this.exercises.findIndex((ex) => ex.id === exercise.id);
      if (exIndex >= 0) {
        (this.exercises[exIndex] as any).selected = false;
      }
    } else {
      exercisesArray.push(
        this.fb.group({
          exerciseId: [exercise.id],
          sets: [null, Validators.required],
          reps: [null, Validators.required],
          restType: [''],
          restValue: [null, Validators.required],
        })
      );

      const exIndex = this.exercises.findIndex((ex) => ex.id === exercise.id);
      if (exIndex >= 0) {
        (this.exercises[exIndex] as any).selected = true;
      }
    }
  }

  assignExercisesToWorkouts(): void {
    const assignmentObservables: Observable<any>[] = [];
    let hasErrors = false;
    this.weeks.controls.forEach((weekCtrl: AbstractControl) => {
      const weekGroup = weekCtrl as FormGroup;
      const workoutsArray = weekGroup.get('workouts') as FormArray;
      workoutsArray.controls.forEach((workoutCtrl: AbstractControl) => {
        const workoutGroup = workoutCtrl as FormGroup;
        const workoutId: number = workoutGroup.value.id;
        const exercisesArray = workoutGroup.get('exercises') as FormArray;
        exercisesArray.controls.forEach((exerciseGroup: AbstractControl) => {
          const exerciseData = exerciseGroup.value;
          if (
            exerciseData.sets == null ||
            exerciseData.reps == null ||
            exerciseData.restValue == null
          ) {
            this.notificationService.showNotificationMessage(
              'I campi Sets, Reps e Rest devono essere compilati',
              'error'
            );
            hasErrors = true;
            return;
          }
          const workoutExercisePayload = {
            sets: exerciseData.sets,
            reps: exerciseData.reps,
            restType: 'SECONDS',
            restValue: exerciseData.restValue,
            weight: 0,
            exercise: { id: exerciseData.exerciseId },
          };
          assignmentObservables.push(
            this.homePtSvc.addExerciseToWorkout(
              workoutId,
              workoutExercisePayload
            )
          );
        });
      });
    });

    if (hasErrors) return;

    if (assignmentObservables.length > 0) {
      forkJoin(assignmentObservables).subscribe({
        next: () => {
          this.notificationService.showNotificationMessage(
            'Programma completato con successo!',
            'success'
          );
          this.resetForm();
        },
        error: () => {
          this.notificationService.showNotificationMessage(
            'Errore durante l’assegnazione degli esercizi.',
            'error'
          );
        },
      });
    } else {
      this.notificationService.showNotificationMessage(
        'Programma completato con successo!',
        'success'
      );
    }
  }

  resetForm(): void {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  isExerciseSelected(workoutCtrl: FormGroup, exerciseId: number): boolean {
    const exercisesArray = workoutCtrl.get('exercises') as FormArray;
    return exercisesArray.controls.some(
      (control) => control.value.exerciseId === exerciseId
    );
  }

  getExerciseControl(
    workoutCtrl: FormGroup,
    exerciseId: number,
    controlName: string
  ): FormControl {
    const exercisesArray = workoutCtrl.get('exercises') as FormArray;
    const group = exercisesArray.controls.find(
      (control) => control.value.exerciseId === exerciseId
    ) as FormGroup | undefined;
    return group
      ? (group.get(controlName) as FormControl)
      : new FormControl('');
  }

  openAssignModal(programId: number): void {
    this.selectedProgramIdForAssignment = programId;
    this.assignModalVisible = true;
  }

  onModalClosed(closed: boolean): void {
    this.assignModalVisible = false;
    this.selectedProgramIdForAssignment = null;
  }
}
