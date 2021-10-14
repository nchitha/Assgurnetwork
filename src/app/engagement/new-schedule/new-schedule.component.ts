import { Component, OnInit } from '@angular/core';
import { EngagementService } from 'src/app/_services/engagement.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-schedule',
  templateUrl: './new-schedule.component.html',
  styleUrls: ['./new-schedule.component.scss']
})
export class NewScheduleComponent implements OnInit {

  constructor(private engagementService: EngagementService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  onUpload(event: any) {
    this.engagementService.uploadSchedule(event).subscribe((data:any) => {
      this._snackBar.open(data.message, 'Close',{
        duration: 3000,
        panelClass: ["greenAlert"]
      });
  }, (err:any) => {
  
  });
  }
}
