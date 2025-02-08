import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './authentication/guards/login.guard';
import { GuestGuard } from './authentication/guards/guest.guard';

const routes: Routes = [
  { path: '', redirectTo: 'authentication/login', pathMatch: 'full' },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
    canActivate: [GuestGuard],
    canActivateChild: [GuestGuard],
  },
  {
    path: 'HomePt',
    loadChildren: () =>
      import('./home-pt/home-pt.module').then((m) => m.HomePtModule),
    canActivate: [LoginGuard],
    canActivateChild: [LoginGuard],
  },
  {
    path: 'HomeClienti',
    loadChildren: () =>
      import('./home-clienti/home-clienti.module').then(
        (m) => m.HomeClientiModule
      ),
    canActivate: [LoginGuard],
    canActivateChild: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
