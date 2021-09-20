import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { 	MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
@NgModule({
 imports: [
	CommonModule,
	MatIconModule,
  MatMenuModule
  ],
  exports: [
	MatIconModule,
  MatMenuModule
  ],
  declarations: []
})
export class AppMaterialModule { }
