import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightRoutingModule } from './flight-routing.module';
import { FlightComponent } from './flight.component';
import { EditaflightComponent } from './edit-a-flight/edit-a-flight.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { AppSharedModule } from '../../app-shared/app-shared.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [FlightComponent, EditaflightComponent],
  imports: [
    CommonModule,
    FlightRoutingModule,
    AppSharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
  ]
})
export class FlightModule { }
