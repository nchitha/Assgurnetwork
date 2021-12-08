import { Component, OnInit,Inject } from '@angular/core';
import { CommonService } from '../_services/common.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EngagementService } from '../_services/engagement.service';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EngagementCreateDialogComponent } from '../clientdetails/engagement-create-dialog/engagement-create-dialog.component';

@Component({
  selector: 'app-engagement',
  templateUrl: './engagement.component.html',
  styleUrls: ['./engagement.component.scss']
})
export class EngagementComponent implements OnInit {
  engagements:any;
  roleId:any = 0;
  user:any;
  constructor(private commonService:CommonService,private router: Router,private engagementService:EngagementService,public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.user = this.commonService.getUser();
    this.roleId = this.user['roleId'];
    this.fetchEngagements();
  }

  fetchEngagements(){
    this.commonService.getEngagements().pipe(first()).subscribe(data  => {
      this.engagements = data;
    });
  }

  navigateToDashboard(engg:any) {

    this.router.navigate(['app/engagement/dashboard/customer-delight'], { queryParams: { 'client_eng_id': engg.id } });
    this.engagementService.setCurEnggLocal(engg);
  }

  redirectEngagement(eng:any,type:any){
    this.engagementService.setCurEnggLocal(eng);
    if(type == 'dashboard'){
      //this.router.navigate(['app/engagement']);
      this.router.navigate(['app/engagement/dashboard/customer-delight'], { queryParams: { 'client_eng_id': eng.id,'client_eng_name': eng.engagementName } });
    }else if(type == 'schedule'){
      this.router.navigate(['app/engagement/schedule-list'], { queryParams: { 'client_eng_name': eng.engagementName }});
    }
    else if(type == 'reviewResponse'){
      this.router.navigate(['app/engagement/reviewer-response'], { queryParams: { 'client_eng_name': eng.engagementName }});
    }
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

}
