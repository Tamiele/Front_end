import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePtComponent } from './home-pt.component';
import { MyClientComponent } from './my-client/my-client.component';
import { MyProfilComponent } from './my-profil/my-profil.component';

const routes: Routes = [
  {
    path: '',
    component: HomePtComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'clienti', component: MyClientComponent },
      { path: 'myProfil', component: MyProfilComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePtRoutingModule {}
