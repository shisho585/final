import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FlightDetailesComponent } from './flight-detailes/flight-detailes.component';

@NgModule({
  declarations: [LoginComponent, FlightDetailesComponent],
  exports: [LoginComponent, FlightDetailesComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ]
})
export class AppSharedModule { }
