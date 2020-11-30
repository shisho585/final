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

@NgModule({
  declarations: [LoginComponent, FlightDetailesComponent],
  exports: [LoginComponent, FlightDetailesComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ]
})
export class AppSharedModule { }
