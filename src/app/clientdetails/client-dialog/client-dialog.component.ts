import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { InvestorsCreateDialogComponent } from '../investors-create-dialog/investors-create-dialog';
import { CommonService } from './../../_services/common.service';
import { first } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DealersCreateDialogComponent } from '../dealers-create-dialog/dealers-create-dialog.component';
import { OutletsCreateDialogComponent } from '../outlets-create-dialog/outlets-create-dialog.component';
import { EngagementCreateDialogComponent } from '../engagement-create-dialog/engagement-create-dialog.component';
import {Router} from '@angular/router';
@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.scss']
})
export class ClientDialogComponent implements OnInit {
  editItems = false;
  isSelectedItemRow = 0;
  editedItemName = "";
  items:any[] = [];
  type:any = "";
  constructor(public dialog: MatDialog, private commonService:CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,private dialogRef: MatDialogRef<ClientDialogComponent>, private router: Router) { }

  ngOnInit(): void {
    this.type = this.data.type;
    this.fetch();
  }

  fetch(){
    if(this.type == 'Investors')
      this.fetchInvestors();
    if(this.type == 'Dealers')
      this.fetchDealers();
    if(this.type == 'Outlets')
      this.fetchOutlets();
    if(this.type == 'Engagements')
      this.fetchEngagements();
  }

  fetchInvestors(){
    this.commonService.getInvestors().pipe(first()).subscribe(data  => {
      this.items = data;
    });
  }

  fetchDealers(){
    this.commonService.getDealers().pipe(first()).subscribe(data  => {
      this.items = data;
    });
  }

  fetchOutlets(){
    this.commonService.getOutlets().pipe(first()).subscribe(data  => {
      this.items = data;
    });
  }

  fetchEngagements(){
    this.commonService.getEngagements().pipe(first()).subscribe(data  => {
      this.items = data;
    });
  }

  createClient($event:any): void {
    $event.stopPropagation();
    if(this.type == 'Investors'){
        let dialogRef = this.dialog.open(InvestorsCreateDialogComponent, {
          width: '588px',
          panelClass: 'custom-dialog-client',
          data: {  }
        });
    
        dialogRef.afterClosed().subscribe( (result:any) => {
          this.fetch();
        });
      }else if(this.type == 'Dealers'){
        let dialogRef = this.dialog.open(DealersCreateDialogComponent, {
          width: '588px',
          panelClass: 'custom-dialog-client',
          data: { mode:"add",item: ""  }
        });
    
        dialogRef.afterClosed().subscribe( (result:any) => {
          this.fetch();
        });
      }else if(this.type == 'Outlets'){
        let dialogRef = this.dialog.open(OutletsCreateDialogComponent, {
          width: '588px',
          panelClass: 'custom-dialog-client',
          data: { mode:"add",item: ""  }
        });
    
        dialogRef.afterClosed().subscribe( (result:any) => {
          this.fetch();
        });
      }else if(this.type == 'Engagements'){
        let dialogRef = this.dialog.open(EngagementCreateDialogComponent, {
          width: '100%',
          panelClass: 'custom-dialog-client',
          data: { mode:"add",item: ""  }
        });
    
        dialogRef.afterClosed().subscribe( (result:any) => {
          this.fetch();
        });
      }
    }
    

  editItem(i:any,item:any ){
    if(this.type == 'Investors'){
      this.editItems=true;
      this.isSelectedItemRow = i;
      this.editedItemName = item.investorName;
    }else if(this.type == 'Dealers'){
      let dialogRef = this.dialog.open(DealersCreateDialogComponent, {
        width: '588px',
        panelClass: 'custom-dialog-client',
        data: { mode:"edit", item }
      });
  
      dialogRef.afterClosed().subscribe( (result:any) => {
        this.fetch();
      });
    }else if(this.type == 'Outlets'){
      let dialogRef = this.dialog.open(OutletsCreateDialogComponent, {
        width: '588px',
        panelClass: 'custom-dialog-client',
        data: { mode:"edit", item }
      });
  
      dialogRef.afterClosed().subscribe( (result:any) => {
        this.fetch();
      });
    }
  }

  deleteItem(item:any){
    if(this.type =="Investors"){
      this.commonService.deleteInvestors(item.id).pipe(first()).subscribe((data:any)  => {
        this._snackBar.open(data.message, 'Close',{
          duration: 3000,
          panelClass: ["greenAlert"]
        });
        this.fetch();
      });
    }else if(this.type =="Dealers"){
      this.commonService.deleteDealers(item.dealer_id).pipe(first()).subscribe((data:any)  => {
        this._snackBar.open(data.message, 'Close',{
          duration: 3000,
          panelClass: ["greenAlert"]
        });
        this.fetch();
      });
    }else if(this.type =="Outlets"){
      this.commonService.deleteOutlets(item.id).pipe(first()).subscribe((data:any)  => {
        this._snackBar.open(data.message, 'Close',{
          duration: 3000,
          panelClass: ["greenAlert"]
        });
        this.fetch();
      });
    }
  }

  updateItem(item:any,name:string){
    this.commonService.updateInvestor(item.id,name).pipe(first()).subscribe((data:any)  => {
      this._snackBar.open(data.message, 'Close',{
        duration: 3000,
        panelClass: ["greenAlert"]
      });
      this.fetch();
    });
  }

  redirectEngagement(){
    this.router.navigate(['app/engagement']);
    this.dialogRef.close("engagementClose");
  }

}
