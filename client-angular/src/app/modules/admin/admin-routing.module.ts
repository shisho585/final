import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardComponent as UserDashboardCOmponent } from '../user/dashboard/dashboard.component';
import { EditaplainComponent } from './edit-a-plain/edit-a-plain.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'plain/add', component: EditaplainComponent },
  { path: 'plain/edit/:ID', component: EditaplainComponent },
  { path: 'user/:email', component: UserDashboardCOmponent },
  { path: 'flight', loadChildren: () => import('./flight/flight.module').then(m => m.FlightModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
