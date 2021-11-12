import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';

import { EngagementService } from '../../_services/engagement.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {

  tasks: any;
  headActive: boolean = false;
  constructor(private engagementService: EngagementService, private router: Router) { }

  ngOnInit() {

    this.getTasks("NEW");
  }

  getTasks(status: string) {
    this.tasks = [];
    this.engagementService.fetchSchedule(status).subscribe((data:any) => {
      console.log("Tasks: ", data);
      this.tasks = data.map((el:any) => {
        el['dateOfResponse'] = moment(el['dueDate']).format("YYYY-MM-DD");
        return el;
      });
    });
  }

  onCreate() {
    this.router.navigate(['/app/engagement/new-schedule']);
  }

}
