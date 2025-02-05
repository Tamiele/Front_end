import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarPtComponent } from './home-pt/sidebar-pt/sidebar-pt.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidebarPtComponent],
  imports: [CommonModule, RouterModule],
  exports: [SidebarPtComponent],
})
export class SharedModule {}
