import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import * as moment from 'moment';
import { EngagementService } from 'src/app/_services/engagement.service';

@Component({
  selector: 'app-reviewer-response',
  templateUrl: './reviewer-response.component.html',
  styleUrls: ['./reviewer-response.component.scss']
})
export class ReviewerResponseComponent implements OnInit {
  tableHeaders = ['Outlet', "City", "State", "Auditor", "Date of Response", "View Response", ""];
  tasks: Task[] = [];
  isPreviewDisplayed: boolean = false
  auditTaskId: number = 0;
  searchTerm: any;
  headActive: boolean = false;
  constructor(private engagementService: EngagementService, private route: ActivatedRoute, private router: Router) { }

  

  
  ngOnInit() {
    this.getTasks('PENDING');
    this.route.queryParams.subscribe(params => {
      this.auditTaskId = params['audit_id'];
    });
  }

  getTasks(status: string) {
    this.engagementService.fetchSchedule(status).subscribe(data => {
      console.log("Tasks: ", data);
      this.tasks = data;
      // .map(el => {
      //   let task = <Task>{};
      //   task.id = el['auditId'];
      //   task.cityName = el['cityName'];
      //   task.storeName = el['storeName'];
      //   task.dateOfResponse = moment(el['dueDate']).format("YYYY-MM-DD");
      //   task.state = el['stateName'];
      //   task.mysteryShopper = el['mystryShopper'];
      //   task.storeId = el['storeId'];
      //   return task;
      // })
    });
  }
  // onClickViewResponse(task: Task) {
  //   console.log("task ", task);
  //   let extras: NavigationExtras = {
  //     queryParams: { 'audit_id': task.id, 'storeId': task.storeId }
  //   };
  //   this.router.navigate(['/admin/questionnarie'], extras);
  // }

  // onClickConfirmPublish() {
  //   let clientengagementId: Number = this.engagementService.getCurEnggLocal()['client_engagement_id'];
  //   this._questionnarie.publishAuditTask(this.auditTaskId, clientengagementId).subscribe(res => {
  //     if (res) {
  //       this.closeBtn.nativeElement.click();
  //     }
  //   })
  // }

}
