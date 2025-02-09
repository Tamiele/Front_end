import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SidebarPtComponent } from '../home-pt/sidebar-pt/sidebar-pt.component';

@NgModule({
  declarations: [SidebarPtComponent],
  imports: [CommonModule, RouterModule],
  exports: [SidebarPtComponent],
})
export class SharedModule {}
