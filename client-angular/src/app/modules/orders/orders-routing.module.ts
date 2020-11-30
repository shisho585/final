import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailedComponent } from './detailed/detailed.component';
import { DoneComponent } from './done/done.component';
import { FinishComponent } from './finish/finish.component';
import { PickaflightComponent } from './pick-a-flight/pick-a-flight.component';

const routes: Routes = [
  { path: '', redirectTo: 'pick-a-flight' },
  { path: 'pick-a-flight', component: PickaflightComponent },
  { path: 'detailed/:flightID', component: DetailedComponent },
  { path: 'finish', component: FinishComponent },
  { path: 'done', component: DoneComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
