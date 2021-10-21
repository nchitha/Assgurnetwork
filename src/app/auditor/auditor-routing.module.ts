import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditorQuesComponent } from './auditor-ques/auditor-ques.component';
import { AuditorComponent } from './auditor.component';
import { DealerOutletsComponent } from './dealer-outlets/dealer-outlets.component';
import { DealerReviewComponent } from './dealer-review/dealer-review.component';

const routes: Routes = [{ path: '', component: AuditorComponent },
                        { path: 'ques', component: AuditorQuesComponent },
                        { path: 'review-outlets', component: DealerOutletsComponent },
                        { path: 'dealer-review', component: DealerReviewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditorRoutingModule { }
