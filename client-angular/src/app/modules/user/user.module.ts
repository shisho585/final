import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AppSharedModule } from '../app-shared/app-shared.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    AppSharedModule,
    MatButtonModule
  ]
})
export class UserModule { }
