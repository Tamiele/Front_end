import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iExercise } from '../../interfaces/i-exercise';
import { NotificationService } from '../../notifaction/notification.service';
import { HomePtService } from '../home-pt.service';

@Component({
  selector: 'app-esercizi',
  templateUrl: './esercizi.component.html',
  styleUrl: './esercizi.component.scss',
})
export class EserciziComponent implements OnInit {
  exerciseForm!: FormGroup;
  fullExercises: iExercise[] = [];

  // Esercizi visualizzati sulla pagina corrente
  displayedExercises: iExercise[] = [];
  selectedMuscleGroup: string = '';

  // Variabili per la paginazione (client-side)
  currentPage: number = 0;
  pageSize: number = 6;
  totalPages: number = 1;

  constructor(
    private fb: FormBuilder,
    private homePtservice: HomePtService,
    private notificationService: NotificationService
  ) {}
  ngOnInit(): void {
    this.exerciseForm = this.fb.group({
      name: ['', Validators.required],
      nameEn: [''],
      muscleGroup: ['', Validators.required],
      description: [''],
      descriptionEn: [''],
    });
    this.loadExercises();
  }

  loadExercises(): void {
    if (
      this.selectedMuscleGroup &&
      this.selectedMuscleGroup.trim().length > 0
    ) {
      this.homePtservice
        .getExercisesByMuscleGroup(this.selectedMuscleGroup)
        .subscribe({
          next: (exercises) => {
            this.fullExercises = exercises;
            this.setupPagination();
          },
          error: (err) => {
            this.notificationService.showNotificationMessage(
              'Errore nel caricamento degli esercizi',
              'error'
            );
          },
        });
    } else {
      this.homePtservice.getAllExercises().subscribe({
        next: (exercises) => {
          this.fullExercises = exercises;
          this.setupPagination();
        },
        error: (err) => {
          this.notificationService.showNotificationMessage(
            'Errore nel caricamento degli esercizi',
            'error'
          );
        },
      });
    }
  }

  setupPagination(): void {
    this.currentPage = 0;
    this.totalPages = Math.ceil(this.fullExercises.length / this.pageSize);
    this.updateDisplayedExercises();
  }

  updateDisplayedExercises(): void {
    const start = this.currentPage * this.pageSize;
    this.displayedExercises = this.fullExercises.slice(
      start,
      start + this.pageSize
    );
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedExercises();
    }
  }

  onFilterChange(): void {
    this.loadExercises();
  }

  createExercise(): void {
    if (this.exerciseForm.invalid) {
      this.notificationService.showNotificationMessage(
        'Compila tutti i campi obbligatori!',
        'warning'
      );
      return;
    }
    const newExercise: iExercise = this.exerciseForm.value;
    this.homePtservice.createExercise(newExercise).subscribe({
      next: (exercise) => {
        this.notificationService.showNotificationMessage(
          'Esercizio creato con successo!',
          'success'
        );
        this.exerciseForm.reset();
        this.loadExercises();
      },
      error: (err) => {
        this.notificationService.showNotificationMessage(
          "Errore nella creazione dell'esercizio",
          'error'
        );
      },
    });
  }
}
