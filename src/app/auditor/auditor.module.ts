import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditorRoutingModule } from './auditor-routing.module';
import { AuditorComponent } from './auditor.component';
import { AuditorQuesComponent } from './auditor-ques/auditor-ques.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { AppMaterialModule } from '../app-material/app-material.module';
import { DealerReviewComponent } from './dealer-review/dealer-review.component';
import { DealerOutletsComponent } from './dealer-outlets/dealer-outlets.component';

@NgModule({
  declarations: [
    AuditorComponent,
    AuditorQuesComponent,
    DealerReviewComponent,
    DealerOutletsComponent
  ],
  imports: [
    CommonModule,
    AuditorRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ]
})
export class AuditorModule { }
