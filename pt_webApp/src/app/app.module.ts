import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [JwtHelperService, provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
