import { Component, OnInit } from '@angular/core';
import { CommonService } from '../_services/common.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboard: any;
  constructor(private commonService:CommonService) { }

  ngOnInit(): void {
    this.commonService.getAnalytics().pipe(first()).subscribe(data  => {
      this.dashboard = data;
    });
  }

}
