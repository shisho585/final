import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
  declarations: [PickaflightComponent, DetailedComponent, FinishComponent],
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
    Ng5SliderModule
  ]
})
export class OrdersModule { }
