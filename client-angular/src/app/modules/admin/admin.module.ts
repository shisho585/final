import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatDialogModule } from "@angular/material/dialog";
import { EditaplainComponent } from './edit-a-plain/edit-a-plain.component';

@NgModule({
  declarations: [DashboardComponent, EditaplainComponent],
  imports: [
    CommonModule,
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
