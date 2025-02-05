import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePtComponent } from './home-pt.component';
import { MyClientComponent } from './my-client/my-client.component';

const routes: Routes = [
  {
    path: '',
    component: HomePtComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'clienti', component: MyClientComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePtRoutingModule {}
