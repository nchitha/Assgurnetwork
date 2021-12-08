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
import { ReviewerResponseComponent } from './reviewer-response/reviewer-response.component';
import { DealerLevelComponent } from './dealer-level/dealer-level.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { KpiLevelComponent } from './kpi-level/kpi-level.component';
import { EngagementCreateDialogComponent } from '../clientdetails/engagement-create-dialog/engagement-create-dialog.component';

@NgModule({
  declarations: [
    EngagementComponent,
    ScheduleListComponent,
    NewScheduleComponent,
    CustomerDelightComponent,
    DashboardReviewComponent,
    ReviewerResponseComponent,
    DealerLevelComponent,
    KpiLevelComponent,
    EngagementCreateDialogComponent
  ],
  imports: [
    CommonModule,
    EngagementRoutingModule,
    AppMaterialModule,
    SharedModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule
  ],
  entryComponents: [
    EngagementCreateDialogComponent
  ]
})
export class EngagementModule { }
