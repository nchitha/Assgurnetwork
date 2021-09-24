import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientCreateDialogComponent } from '../client-create-dialog/client-create-dialog.component';
import { CommonService } from './../../_services/common.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.scss']
})
export class ClientDialogComponent implements OnInit {
  editInv = false;
  isSelectedInvRow = 0;
  editedInvName = "";
  investors:[] = [];
  constructor(public dialog: MatDialog, private commonService:CommonService) { }

  ngOnInit(): void {
    this.commonService.getInvestors().pipe(first()).subscribe(data  => {
      this.investors = data;
    });
  }

  createClient(): void {
    let dialogRef = this.dialog.open(ClientCreateDialogComponent, {
      width: '588px',
      panelClass: 'custom-dialog-client',
      data: {  }
    });

    dialogRef.afterClosed().subscribe( (result:any) => {
      console.log('The dialog was closed');
    });
  }

  editInvestor(i:any,inv:any ){

  }

  deleteInvestor(inv_id:any){

  }

  updateInvestor(inv:any,name:string){

  }

}
