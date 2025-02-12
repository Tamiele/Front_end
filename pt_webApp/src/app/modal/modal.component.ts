import { Component } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  constructor(private modalService: ModalService) {}

  get showModal$() {
    return this.modalService.modalState$;
  }

  get modalTitle$() {
    return this.modalService.modalTitle$;
  }

  get modalMessage$() {
    return this.modalService.modalMessage$;
  }

  confirm(): void {
    this.modalService.confirm();
  }

  close(): void {
    this.modalService.closeModal();
  }
}
