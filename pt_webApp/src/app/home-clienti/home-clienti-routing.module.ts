import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeClientiComponent } from './home-clienti.component';
import { DashboardClientComponent } from './dashboard-client/dashboard-client.component';
import { AllenamentiComponent } from './allenamenti/allenamenti.component';
import { MyProfilClientComponent } from './my-profil-client/my-profil-client.component';

const routes: Routes = [
  {
    path: '',
    component: HomeClientiComponent,
    children: [
      { path: 'dashboardClient', component: DashboardClientComponent },
      { path: 'allenamenti', component: AllenamentiComponent },
      { path: 'profiloCliente', component: MyProfilClientComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeClientiRoutingModule {}
