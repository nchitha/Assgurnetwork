import { Component, OnInit } from '@angular/core';
import { EngagementService } from 'src/app/_services/engagement.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-schedule',
  templateUrl: './new-schedule.component.html',
  styleUrls: ['./new-schedule.component.scss']
})
export class NewScheduleComponent implements OnInit {
  eng_title:any;
  constructor(private engagementService: EngagementService, private _snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.eng_title = params.client_eng_name;
    });
  }
  onUpload(event: any) {
    this.engagementService.uploadSchedule(event).subscribe((data:any) => {
      this._snackBar.open("Schedule created successfully", 'Close',{
        duration: 3000,
        panelClass: ["greenAlert"]
      });
      this.router.navigate(['/app/engagement/schedule-list'], { queryParams:{client_eng_name:this.eng_title}});
  }, (err:any) => {
    this._snackBar.open("Error while uploading file", 'Close',{
      duration: 3000,
      panelClass: ["redAlert"]
    });
  });
  }
}
