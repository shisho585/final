import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AppSharedModule } from '../app-shared/app-shared.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    AppSharedModule,
  ]
})
export class UserModule { }
