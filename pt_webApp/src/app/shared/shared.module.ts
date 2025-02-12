import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SidebarPtComponent } from '../home-pt/sidebar-pt/sidebar-pt.component';
import { ModalComponent } from '../modal/modal.component';

@NgModule({
  declarations: [SidebarPtComponent, ModalComponent],
  imports: [CommonModule, RouterModule],
  exports: [SidebarPtComponent, ModalComponent],
})
export class SharedModule {}
