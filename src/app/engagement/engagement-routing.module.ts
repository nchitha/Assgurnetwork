import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDelightComponent } from './customer-delight/customer-delight.component';
import { DashboardReviewComponent } from './dashboard-review/dashboard-review.component';
import { DealerLevelComponent } from './dealer-level/dealer-level.component';
import { EngagementComponent } from './engagement.component';
import { KpiLevelComponent } from './kpi-level/kpi-level.component';
import { NewScheduleComponent } from './new-schedule/new-schedule.component';
import { ReviewerResponseComponent } from './reviewer-response/reviewer-response.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';

const routes: Routes = [{ path: '', component: EngagementComponent },
                        { path: 'schedule-list', component: ScheduleListComponent },
                        { path: 'reviewer-response', component: ReviewerResponseComponent },
                        
                        { path: 'new-schedule', component: NewScheduleComponent },
                        {path: 'dashboard', component: DashboardReviewComponent, children: [
                          { path: '', redirectTo: "customer-delight", pathMatch: 'full' },
                          {path: 'customer-delight', component: CustomerDelightComponent},
                          {path: 'dealer-level', component: DealerLevelComponent},
                          {path: 'kpi-level', component: KpiLevelComponent}
                          ]
                        }
                      ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngagementRoutingModule { }
