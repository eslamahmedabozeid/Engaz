import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  redirectTo: '/leads',
  pathMatch: 'full'
}, {
  path: 'leads',
  loadChildren: () => import('./leads/leads-routing.module').then(m => m.LeadsRoutingModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
