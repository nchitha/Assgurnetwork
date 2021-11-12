import { Component, OnInit } from '@angular/core';
import { CommonService } from '../_services/common.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EngagementService } from '../_services/engagement.service';

@Component({
  selector: 'app-engagement',
  templateUrl: './engagement.component.html',
  styleUrls: ['./engagement.component.scss']
})
export class EngagementComponent implements OnInit {
  engagements:any;
  roleId:any = 0;
  user:any;
  constructor(private commonService:CommonService,private router: Router,private engagementService:EngagementService) { }

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
      this.router.navigate(['app/engagement/dashboard/customer-delight'], { queryParams: { 'client_eng_id': eng.id } });
    }else if(type == 'schedule'){
      this.router.navigate(['app/engagement/schedule-list']);
    }
    else if(type == 'reviewResponse'){
      this.router.navigate(['app/engagement/reviewer-response']);
    }
  }

}
