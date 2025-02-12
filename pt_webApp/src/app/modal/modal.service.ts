import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalState = new BehaviorSubject<boolean>(false);
  private modalMessage = new BehaviorSubject<string>('');
  private modalTitle = new BehaviorSubject<string>('Conferma');
  private modalCallback: (() => void) | null = null;

  showModal(title: string, message: string, callback: () => void) {
    this.modalTitle.next(title);
    this.modalMessage.next(message);
    this.modalCallback = callback;
    this.modalState.next(true);
  }

  confirm() {
    if (this.modalCallback) {
      this.modalCallback();
    }
    this.closeModal();
  }

  closeModal() {
    this.modalState.next(false);
  }

  get modalTitle$() {
    return this.modalTitle.asObservable();
  }

  get modalMessage$() {
    return this.modalMessage.asObservable();
  }

  get modalState$() {
    return this.modalState.asObservable();
  }
}
