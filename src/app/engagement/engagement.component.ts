import { Component, OnInit } from '@angular/core';
import { CommonService } from '../_services/common.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-engagement',
  templateUrl: './engagement.component.html',
  styleUrls: ['./engagement.component.scss']
})
export class EngagementComponent implements OnInit {
  engagements:any;
  constructor(private commonService:CommonService) { }

  ngOnInit(): void {
    this.fetchEngagements();
  }

  fetchEngagements(){
    this.commonService.getEngagements().pipe(first()).subscribe(data  => {
      this.engagements = data;
    });
  }

}
