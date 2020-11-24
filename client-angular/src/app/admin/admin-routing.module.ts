import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddaflightComponent } from './add-a-flight/add-a-flight.component';
import { AddaplainComponent } from './add-a-plain/add-a-plain.component';
import { FlightComponent } from './flight/flight.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-a-flight', component: AddaflightComponent },
  { path: 'add-a-plain', component: AddaplainComponent },
  { path: 'flight/:ID', component: FlightComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
