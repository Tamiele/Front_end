import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeClientiRoutingModule } from './home-clienti-routing.module';
import { HomeClientiComponent } from './home-clienti.component';


@NgModule({
  declarations: [
    HomeClientiComponent
  ],
  imports: [
    CommonModule,
    HomeClientiRoutingModule
  ]
})
export class HomeClientiModule { }
