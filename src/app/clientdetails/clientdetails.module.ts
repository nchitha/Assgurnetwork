import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../app-material/app-material.module';

import { ClientdetailsRoutingModule } from './clientdetails-routing.module';
import { ClientdetailsComponent } from './clientdetails.component';
import { ClientDialogComponent } from './client-dialog/client-dialog.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { ClientCreateDialogComponent } from './client-create-dialog/client-create-dialog.component';

@NgModule({
  declarations: [
    ClientdetailsComponent,
    ClientDialogComponent,
    ClientCreateDialogComponent
  ],
  entryComponents: [ClientDialogComponent,ClientCreateDialogComponent],
  imports: [
    CommonModule,
    ClientdetailsRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClientdetailsModule { }
