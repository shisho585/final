import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { OrdersRoutingModule } from './orders-routing.module';
import { PickaflightComponent } from './pick-a-flight/pick-a-flight.component';
import { DetailedComponent } from './detailed/detailed.component';
import { FinishComponent } from './finish/finish.component';
import { DoneComponent } from './done/done.component';

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
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';

import { NgxSliderModule } from "@angular-slider/ngx-slider";
import { NgxPayPalModule } from "ngx-paypal";
import { AppSharedModule } from '../app-shared/app-shared.module';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [PickaflightComponent, DetailedComponent, FinishComponent, DoneComponent, DialogComponent],
  imports: [
    CommonModule,
    AppSharedModule,
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
    MatIconModule,
    NgxSliderModule,
    MatDialogModule,
    NgxPayPalModule,
    FormsModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ]
})
export class OrdersModule { }
