import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type ToastLevel = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  level: ToastLevel;
  message: string;
  autoHideMs?: number;
  id: number;
}

@Injectable({ providedIn: 'root' })
export class UiToastService {
  private toasts$ = new BehaviorSubject<ToastMessage[]>([]);
  private incrementalId = 0;

  get stream() {
    return this.toasts$.asObservable();
  }

  push(level: ToastLevel, message: string, autoHideMs: number = 4000) {
    const toast: ToastMessage = {
      id: ++this.incrementalId,
      level,
      message,
      autoHideMs,
    };
    this.toasts$.next([...this.toasts$.value, toast]);
    if (autoHideMs > 0) {
      setTimeout(() => this.dismiss(toast.id), autoHideMs);
    }
  }

  dismiss(id: number) {
    this.toasts$.next(this.toasts$.value.filter((toast) => toast.id !== id));
  }

  clear() {
    this.toasts$.next([]);
  }
}
