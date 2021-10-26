import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDelightComponent } from './customer-delight/customer-delight.component';
import { DashboardReviewComponent } from './dashboard-review/dashboard-review.component';
import { EngagementComponent } from './engagement.component';
import { NewScheduleComponent } from './new-schedule/new-schedule.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';

const routes: Routes = [{ path: '', component: EngagementComponent },
                        { path: 'schedule-list', component: ScheduleListComponent },
                        { path: 'new-schedule', component: NewScheduleComponent },
                        {path: 'dashboard', component: DashboardReviewComponent, children: [
                          { path: '', redirectTo: "customer-delight", pathMatch: 'full' },
                          {path: 'customer-delight', component: CustomerDelightComponent}
                          ]
                        }
                      ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngagementRoutingModule { }
