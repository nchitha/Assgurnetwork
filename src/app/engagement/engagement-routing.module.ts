import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EngagementComponent } from './engagement.component';

const routes: Routes = [{ path: '', component: EngagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngagementRoutingModule { }
