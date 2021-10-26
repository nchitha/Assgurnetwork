import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EngagementRoutingModule } from './engagement-routing.module';
import { EngagementComponent } from './engagement.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { NewScheduleComponent } from './new-schedule/new-schedule.component';
import { SharedModule } from '../_shared/shared.module';
import { CustomerDelightComponent } from './customer-delight/customer-delight.component';
import { DashboardReviewComponent } from './dashboard-review/dashboard-review.component';

@NgModule({
  declarations: [
    EngagementComponent,
    ScheduleListComponent,
    NewScheduleComponent,
    CustomerDelightComponent,
    DashboardReviewComponent
  ],
  imports: [
    CommonModule,
    EngagementRoutingModule,
    AppMaterialModule,
    SharedModule
  ]
})
export class EngagementModule { }
