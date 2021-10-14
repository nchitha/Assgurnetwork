import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EngagementRoutingModule } from './engagement-routing.module';
import { EngagementComponent } from './engagement.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { NewScheduleComponent } from './new-schedule/new-schedule.component';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
  declarations: [
    EngagementComponent,
    ScheduleListComponent,
    NewScheduleComponent
  ],
  imports: [
    CommonModule,
    EngagementRoutingModule,
    AppMaterialModule,
    SharedModule
  ]
})
export class EngagementModule { }
