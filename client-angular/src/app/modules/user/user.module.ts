import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AppSharedModule } from '../app-shared/app-shared.module';
import { MatButtonModule } from '@angular/material/button';
import { EditComponent } from './edit/edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DashboardComponent, EditComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    AppSharedModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ]
})
export class UserModule { }
