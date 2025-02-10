import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePtRoutingModule } from './home-pt-routing.module';
import { HomePtComponent } from './home-pt.component';

import { MyClientComponent } from './my-client/my-client.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { MyProfilComponent } from './my-profil/my-profil.component';
import { SharedModule } from '../shared/shared.module';
import { NotifactionComponent } from '../notifaction/notifaction.component';
import { ProgrammiComponent } from './programmi/programmi.component';
import { EserciziComponent } from './esercizi/esercizi.component';

@NgModule({
  declarations: [
    HomePtComponent,
    MyClientComponent,
    DashboardComponent,
    MyProfilComponent,
    NotifactionComponent,
    ProgrammiComponent,
    EserciziComponent,
  ],
  imports: [CommonModule, HomePtRoutingModule, SharedModule, FormsModule],
})
export class HomePtModule {}
