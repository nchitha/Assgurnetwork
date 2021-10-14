import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EngagementComponent } from './engagement.component';
import { NewScheduleComponent } from './new-schedule/new-schedule.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';

const routes: Routes = [{ path: '', component: EngagementComponent },
                        { path: 'schedule-list', component: ScheduleListComponent },
                        { path: 'new-schedule', component: NewScheduleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngagementRoutingModule { }
