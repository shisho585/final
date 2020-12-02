import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditaflightComponent } from './edit-a-flight/edit-a-flight.component';

import { FlightComponent } from './flight.component';

const routes: Routes = [
  { path: '', redirectTo: 'add' },
  { path: 'add', component: EditaflightComponent },
  { path: 'edit/:ID', component: EditaflightComponent },
  { path: ':ID', component: FlightComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightRoutingModule { }
