import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { 	MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
 imports: [
	CommonModule,
	MatIconModule,
  MatMenuModule,
  MatDialogModule
  ],
  exports: [
	MatIconModule,
  MatMenuModule,
  MatDialogModule
  ],
  declarations: []
})
export class AppMaterialModule { }
