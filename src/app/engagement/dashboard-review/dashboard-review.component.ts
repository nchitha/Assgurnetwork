import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-review',
  templateUrl: './dashboard-review.component.html',
  styleUrls: ['./dashboard-review.component.scss']
})
export class DashboardReviewComponent implements OnInit {

  constructor() { }
  
  selectTab(num: number) {
    localStorage.setItem("currentTab", num.toString())
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('currentTab'))
    if(!localStorage.getItem('currentTab')){
      localStorage.setItem("currentTab", '1')
    }
  }

}
