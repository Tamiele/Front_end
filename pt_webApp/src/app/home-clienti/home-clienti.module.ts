import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeClientiRoutingModule } from './home-clienti-routing.module';
import { HomeClientiComponent } from './home-clienti.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardClientComponent } from './dashboard-client/dashboard-client.component';
import { AllenamentiComponent } from './allenamenti/allenamenti.component';
import { MyProfilClientComponent } from './my-profil-client/my-profil-client.component';

@NgModule({
  declarations: [HomeClientiComponent, DashboardClientComponent, AllenamentiComponent, MyProfilClientComponent],
  imports: [CommonModule, HomeClientiRoutingModule, SharedModule],
})
export class HomeClientiModule {}
