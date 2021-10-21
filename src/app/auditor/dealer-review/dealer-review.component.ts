import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dealer-review',
  templateUrl: './dealer-review.component.html',
  styleUrls: ['./dealer-review.component.scss']
})
export class DealerReviewComponent implements OnInit {
  options = [
    { name: "No", id: "1" },
    { name: "Yes", id: "2" },
    { name: "N/A", id: "3" }
  ];
  categoryArray:any = [];
  defaultCategorySelected:any = [];
  dropdownCategorySettings:any = {};
  bucketArr:any = [];
  defaultBucketSelected:any = [];
  dropdownBucketSettings:any = {};
  meeting_date:any;
  selectedQuestions:any = [];
  constructor(private router: Router) { }
  ngOnInit(): void {
    
    this.categoryArray = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.defaultCategorySelected = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownCategorySettings = {
      singleSelection: false,
      idField: 'item_id',
      idProperty: 'id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.bucketArr = [
      { item_id: 1, item_text: 'Mumsbai' },
      { item_id: 2, item_text: 'Bansgaluru' },
      { item_id: 3, item_text: 'Pusne' },
      { item_id: 4, item_text: 'Navssari' },
      { item_id: 5, item_text: 'News Delhi' }
    ];
    this.defaultBucketSelected = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownBucketSettings = {
      singleSelection: false,
      idField: 'item_id',
      idProperty: 'id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  category(item: any,action: any) {
    console.log(item);
  }
  
  bucket(item: any,action: any) {
    console.log(item);
  }

  changed(toggleName: any) {

  }

}
