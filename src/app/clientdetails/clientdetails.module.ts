import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../app-material/app-material.module';

import { ClientdetailsRoutingModule } from './clientdetails-routing.module';
import { ClientdetailsComponent } from './clientdetails.component';
import { ClientDialogComponent } from './client-dialog/client-dialog.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { InvestorsCreateDialogComponent } from './investors-create-dialog/investors-create-dialog';
import { SharedModule } from '../_shared/shared.module';
import { DealersCreateDialogComponent } from './dealers-create-dialog/dealers-create-dialog.component';

@NgModule({
  declarations: [
    ClientdetailsComponent,
    ClientDialogComponent,
    InvestorsCreateDialogComponent,
    DealersCreateDialogComponent
  ],
  entryComponents: [ClientDialogComponent,InvestorsCreateDialogComponent,DealersCreateDialogComponent],
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
