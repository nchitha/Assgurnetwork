import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../app-material/app-material.module';
import { SharedModule } from '../_shared/shared.module';

import { ClientdetailsRoutingModule } from './clientdetails-routing.module';
import { ClientdetailsComponent } from './clientdetails.component';
import { ClientDialogComponent } from './client-dialog/client-dialog.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { InvestorsCreateDialogComponent } from './investors-create-dialog/investors-create-dialog';
import { DealersCreateDialogComponent } from './dealers-create-dialog/dealers-create-dialog.component';
import { OutletsCreateDialogComponent } from './outlets-create-dialog/outlets-create-dialog.component';
//import { EngagementCreateDialogComponent } from './engagement-create-dialog/engagement-create-dialog.component';
import { UserCreateDialogComponent } from './user-create-dialog/user-create-dialog.component';
import { EngagementDialogComponent } from './engagement-dialog/engagement-dialog.component';

@NgModule({
  declarations: [
    ClientdetailsComponent,
    ClientDialogComponent,
    InvestorsCreateDialogComponent,
    DealersCreateDialogComponent,
    OutletsCreateDialogComponent,
    UserCreateDialogComponent,
    EngagementDialogComponent
  ],
  entryComponents: [ClientDialogComponent,InvestorsCreateDialogComponent,DealersCreateDialogComponent,OutletsCreateDialogComponent,UserCreateDialogComponent,EngagementDialogComponent],
  imports: [
    CommonModule,
    ClientdetailsRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ClientdetailsModule { }
