import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from "@angular/material/dialog";
import { FlightDetailesComponent } from './flight-detailes/flight-detailes.component';
import { OrderComponent } from './order/order.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [LoginComponent, FlightDetailesComponent, OrderComponent],
  exports: [LoginComponent, FlightDetailesComponent, OrderComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule
  ]
})
export class AppSharedModule { }
