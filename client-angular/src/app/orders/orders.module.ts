import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { OrdersRoutingModule } from './orders-routing.module';
import { PickaflightComponent } from './pick-a-flight/pick-a-flight.component';
import { DetailedComponent } from './detailed/detailed.component';
import { FinishComponent } from './finish/finish.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NgxSliderModule } from "@angular-slider/ngx-slider";
import { NgxPayPalModule } from "ngx-paypal";
import { SeatMapFilterPipe } from './seat-map-filter.pipe';
import { DoneComponent } from './done/done.component';

@NgModule({
  declarations: [PickaflightComponent, DetailedComponent, FinishComponent, SeatMapFilterPipe, DoneComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatExpansionModule,
    MatRadioModule,
    MatTableModule,
    MatSortModule,
    NgxSliderModule,
    NgxPayPalModule,
    FormsModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ]
})
export class OrdersModule { }
