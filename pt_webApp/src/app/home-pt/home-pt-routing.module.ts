import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePtComponent } from './home-pt.component';

const routes: Routes = [{ path: '', component: HomePtComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePtRoutingModule {}
