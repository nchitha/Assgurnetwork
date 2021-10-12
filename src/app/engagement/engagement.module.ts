import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EngagementRoutingModule } from './engagement-routing.module';
import { EngagementComponent } from './engagement.component';
import { AppMaterialModule } from '../app-material/app-material.module';

@NgModule({
  declarations: [
    EngagementComponent
  ],
  imports: [
    CommonModule,
    EngagementRoutingModule,
    AppMaterialModule
  ]
})
export class EngagementModule { }
