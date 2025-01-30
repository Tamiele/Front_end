import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeClientiComponent } from './home-clienti.component';

const routes: Routes = [{ path: '', component: HomeClientiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeClientiRoutingModule { }
