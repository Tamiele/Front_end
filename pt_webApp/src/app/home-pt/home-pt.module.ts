import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePtRoutingModule } from './home-pt-routing.module';
import { HomePtComponent } from './home-pt.component';

import { MyClientComponent } from './my-client/my-client.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyProfilComponent } from './my-profil/my-profil.component';
import { SharedModule } from '../shared/shared.module';
import { NotifactionComponent } from '../notifaction/notifaction.component';
import { ProgrammiComponent } from './programmi/programmi.component';
import { EserciziComponent } from './esercizi/esercizi.component';
import { ModalComponent } from '../modal/modal.component';
import { AssignProgramModalComponent } from './assign-program-modal/assign-program-modal.component';

@NgModule({
  declarations: [
    HomePtComponent,
    MyClientComponent,
    DashboardComponent,
    MyProfilComponent,
    NotifactionComponent,
    ProgrammiComponent,
    EserciziComponent,
    AssignProgramModalComponent,
  ],
  imports: [
    CommonModule,
    HomePtRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class HomePtModule {}
