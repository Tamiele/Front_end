import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'authentication/login', pathMatch: 'full' },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'HomePt',
    loadChildren: () =>
      import('./home-pt/home-pt.module').then((m) => m.HomePtModule),
  },
  {
    path: 'HomeClienti',
    loadChildren: () =>
      import('./home-clienti/home-clienti.module').then(
        (m) => m.HomeClientiModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
