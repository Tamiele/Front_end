import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeClientiRoutingModule } from './home-clienti-routing.module';
import { HomeClientiComponent } from './home-clienti.component';
import { SidebarPtComponent } from '../home-pt/sidebar-pt/sidebar-pt.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [HomeClientiComponent],
  imports: [CommonModule, HomeClientiRoutingModule, SharedModule],
})
export class HomeClientiModule {}
