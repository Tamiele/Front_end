import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SidebarPtComponent } from '../home-pt/sidebar-pt/sidebar-pt.component';
import { ModalComponent } from '../modal/modal.component';
import { NotifactionComponent } from '../notifaction/notifaction.component';

@NgModule({
  declarations: [SidebarPtComponent, ModalComponent, NotifactionComponent],
  imports: [CommonModule, RouterModule],
  exports: [SidebarPtComponent, ModalComponent, NotifactionComponent],
})
export class SharedModule {}
