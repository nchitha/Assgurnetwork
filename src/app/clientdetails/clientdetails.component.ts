import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientDialogComponent } from './client-dialog/client-dialog.component';
import { CommonService } from '../_services/common.service';
import { NgxSpinnerService } from "ngx-bootstrap-spinner";
@Component({
  selector: 'app-clientdetails',
  templateUrl: './clientdetails.component.html',
  styleUrls: ['./clientdetails.component.scss']
})
export class ClientdetailsComponent implements OnInit {
  dashboard: any;
  loaded = false;
  users:any[] = [];
  constructor(public dialog: MatDialog,public commonService:CommonService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.fetch();
  }

  fetch(){
    this.spinner.show();
    this.commonService.getAnalytics().subscribe((data)=>{
      this.loaded= true;
      this.spinner.hide();
      this.dashboard = data;
    });
  }
  openDialog(type:any): void {
    let dialogRef = this.dialog.open(ClientDialogComponent, {
      width: '588px',
      panelClass: 'custom-dialog-client',
      data: { type }
    });

    dialogRef.afterClosed().subscribe( (result:any) => {
      if(result !='engagementClose'){
        this.fetch();
      }
    });
  }

}
