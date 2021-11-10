import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { CommonService } from './../../_services/common.service';
import { first } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import { EngagementService } from '../../_services/engagement.service';
import { EngagementCreateDialogComponent } from '../engagement-create-dialog/engagement-create-dialog.component';

@Component({
  selector: 'app-engagement-dialog',
  templateUrl: './engagement-dialog.component.html',
  styleUrls: ['./engagement-dialog.component.scss']
})
export class EngagementDialogComponent implements OnInit {
  editItems = false;
  isSelectedItemRow = 0;
  editedItemName = "";
  items:any[] = [];
  type:any = "";
  constructor(public dialog: MatDialog, private commonService:CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar, private router: Router, private engagementService: EngagementService,private dialogRef: MatDialogRef<EngagementDialogComponent>) { }

  ngOnInit(): void {
    this.fetchEngagements();
  }


  fetchEngagements(){
    this.commonService.getEngagements().pipe(first()).subscribe(data  => {
      this.items = data;
    });
  }
  
  createClient($event:any): void {
    $event.stopPropagation();
    let dialogRef = this.dialog.open(EngagementCreateDialogComponent, {
      width: '100%',
      panelClass: 'custom-dialog-client',
      data: { mode:"add",item: ""  }
    });

    dialogRef.afterClosed().subscribe( (result:any) => {
      this.fetchEngagements();
    });
  }
    

  redirectEngagement(eng:any,type:any){
    this.engagementService.setCurEnggLocal(eng);
    if(type == 'dashboard'){
      //this.router.navigate(['app/engagement']);
      this.router.navigate(['app/engagement/dashboard/customer-delight'], { queryParams: { 'client_eng_id': eng.id } });
    }else if(type == 'schedule'){
      this.router.navigate(['app/engagement/schedule-list']);
    }
    else if(type == 'reviewResponse'){
      this.router.navigate(['app/engagement/reviewer-response']);
    }
    this.dialogRef.close("engagementClose");
  }

}
