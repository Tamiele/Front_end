import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePtRoutingModule } from './home-pt-routing.module';
import { HomePtComponent } from './home-pt.component';
import { SharedModule } from '../shared.module';
import { MyClientComponent } from './my-client/my-client.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [HomePtComponent, MyClientComponent, DashboardComponent],
  imports: [CommonModule, HomePtRoutingModule, SharedModule],
})
export class HomePtModule {}
