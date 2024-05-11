import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadsListComponent } from './leads-list.component';
import { LeadsModule } from './leads.module';

const routes: Routes = [{
  path: '',
  component: LeadsListComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes), 
    LeadsModule
  ],
  exports: [RouterModule]
})
export class LeadsRoutingModule { }