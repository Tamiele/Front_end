import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePtRoutingModule } from './home-pt-routing.module';
import { HomePtComponent } from './home-pt.component';

import { SidebarPtComponent } from './sidebar-pt/sidebar-pt.component';

@NgModule({
  declarations: [HomePtComponent, SidebarPtComponent],
  imports: [CommonModule, HomePtRoutingModule],
})
export class HomePtModule {}
