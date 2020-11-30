import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppSharedModule } from '../app-shared/app-shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AddaflightComponent } from './add-a-flight/add-a-flight.component';
import { AddaplainComponent } from './add-a-plain/add-a-plain.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FlightComponent } from './flight/flight.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatDialogModule } from "@angular/material/dialog";

import { PlainComponent } from './plain/plain.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [DashboardComponent, AddaflightComponent, AddaplainComponent, FlightComponent, PlainComponent, OrderComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    AdminRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    HttpClientModule,
    MatGridListModule
  ]
})
export class AdminModule { }
