import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientdetailsComponent } from './clientdetails.component';

const routes: Routes = [{ path: '', component: ClientdetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientdetailsRoutingModule { }
