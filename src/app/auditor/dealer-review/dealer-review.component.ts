import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuditService } from 'src/app/_services/audit.service';
import { NgxSpinnerService } from "ngx-bootstrap-spinner";
import { MatSnackBar } from '@angular/material/snack-bar';

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
  engId = 0;
  storeName = "";
  storeId = 0;
  question_array = [];
  auditTaskId: number;
  evidenceArr = [];
  uploadForm: FormGroup;
  isMarkedChecked = false;
  isQuickWinChecked = false;
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private auditService:AuditService,private spinner: NgxSpinnerService,private _snackBar: MatSnackBar) {
    this.uploadForm = this.formBuilder.group({
      evidence: ['']
    });
   }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.engId = params.eng_id;
      this.storeName = params.store_name;
      this.storeId = params.storeId;
    });
    this.categoryArray = [];
    this.defaultCategorySelected = [];
    this.dropdownCategorySettings = {
      singleSelection: false,
      idField: 'categoryName',
      idProperty: 'id',
      textField: 'categoryName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.bucketArr = [];
    this.defaultBucketSelected = [];
    this.dropdownBucketSettings = {
      singleSelection: false,
      idField: 'id',
      idProperty: 'id',
      textField: 'bucketName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.spinner.show();
    this.auditService.getCategory(this.engId).subscribe((data:any) => {
      this.categoryArray = data;
      this.defaultCategorySelected = [...this.categoryArray];
      this.auditService.getBucket(this.engId).subscribe((bucketArr:any) => {
        this.bucketArr = bucketArr;
        this.defaultBucketSelected = [...this.bucketArr];
        this.getQuestions();
      });
    });
  }

  getQuestions(){
    this.spinner.show();
    if(this.defaultCategorySelected.length && this.defaultBucketSelected.length){
      let bucket = this.defaultBucketSelected.map(function (e) {
        return e.id;
      }).join(',');
      let category = this.defaultCategorySelected.map(function (e) {
        return e.id;
      }).join(',');
      this.auditService.getDeakerReviewResponse(this.engId,this.storeId,bucket,category,this.isMarkedChecked,this.isQuickWinChecked).subscribe((bucketArr:any) => {
        this.auditTaskId = bucketArr.auditTaskId;
        this.question_array = bucketArr.data;
        console.log(this.question_array);
        this.spinner.hide();
      });
    }else{
      this.spinner.hide();
    }
  }

  category(item: any,action: any) {
    console.log(item);
    this.getQuestions();
  }
  
  bucket(item: any,action: any) {
    console.log(item);
    this.getQuestions();
  }

  changed(toggleName: any) {
    this.getQuestions();
  }

  getEvidence(q){
    this.auditService.auditAnswerEvidenceGet(q.answerId,).subscribe((data:any) => {
      console.log(data);
      this.evidenceArr = data;
     // this.getQuestions();
    }, (err:any) => {
      this._snackBar.open(err.error.message, 'Close',{
        duration: 3000,
        panelClass: ["redAlert"]
      });
    });
  }

  onSubmit(q){
    let formData = new FormData();
    if (this.uploadForm.get('evidence')!.value.length > 0) {
      for (let i = 0; i < this.uploadForm.get('evidence')!.value.length; i++) {
        formData.append('evidences', this.uploadForm.get('evidence')!.value[i]);
      }
      this.auditService.auditAnswerEvidenceSubmit(q.answerId,formData).subscribe((data:any) => {
        this._snackBar.open(data.message, 'Close',{
          duration: 3000,
          panelClass: ["greenAlert"]
        });
       // this.getQuestions();
      }, (err:any) => {
        this._snackBar.open(err.error.message, 'Close',{
          duration: 3000,
          panelClass: ["redAlert"]
        });
      });
    }
  }

  onFileSelect(event:any,q ) {
    let files:any = [];
    if (event.target.files.length > 0) {
      // let file = event.target.files[0];
      // this.uploadForm.get('evidence').setValue(file);
      for (let i = 0; i < event.target.files.length; i++) {
        files.push(event.target.files[i]);
      }
    }
    if(this.uploadForm.get('evidence')){
      this.uploadForm.get('evidence')!.setValue(files);
    }
    let formData = new FormData();
    if (this.uploadForm.get('evidence')!.value.length > 0) {
      for (let i = 0; i < this.uploadForm.get('evidence')!.value.length; i++) {
        formData.append('evidences', this.uploadForm.get('evidence')!.value[i]);
      }
      this.auditService.auditAnswerEvidenceSubmit(q.answerId,formData).subscribe((data:any) => {
        this._snackBar.open(data.message, 'Close',{
          duration: 3000,
          panelClass: ["greenAlert"]
        });
       // this.getQuestions();
      }, (err:any) => {
        this._snackBar.open(err.error.message, 'Close',{
          duration: 3000,
          panelClass: ["redAlert"]
        });
      });
    }
    //console.log("hfdifios", this.uploadForm.get('evidence').value.length);
  }

  onWinClick(response){
    if(!response.answerId){
      let params = {engagementId :this.engId,storeId:this.storeId,questionId:response.questionId,quick_win:response.quick_win,auditTaskId:this.auditTaskId};
      console.log(params,response);
      this.auditService.auditAnswer(params).subscribe((data:any) => {
        this._snackBar.open(data.message, 'Close',{
          duration: 3000,
          panelClass: ["greenAlert"]
        });
        this.getQuestions();
      }, (err:any) => {
        this._snackBar.open(err.error.message, 'Close',{
          duration: 3000,
          panelClass: ["redAlert"]
        });
        console.log("Login error", err.error.message);
      });
    }else{
      let params = {quick_win:response.quick_win};
      console.log(params,response);
      this.auditService.auditPutAnswer(params,response.answerId).subscribe((data:any) => {
        this._snackBar.open(data.message, 'Close',{
          duration: 3000,
          panelClass: ["greenAlert"]
        });
        this.getQuestions();
      }, (err:any) => {
        this._snackBar.open(err.error.message, 'Close',{
          duration: 3000,
          panelClass: ["redAlert"]
        });
        console.log("Login error", err.error.message);
      });
    }
  }

  submitForm(){
    this.auditService.putStatusAudit(this.auditTaskId,"PUBLISH").subscribe((data:any) => {
        this._snackBar.open(data.message, 'Close',{
          duration: 3000,
          panelClass: ["greenAlert"]
        });
        this.getQuestions();
      }, (err:any) => {
        this._snackBar.open(err.error.message, 'Close',{
          duration: 3000,
          panelClass: ["redAlert"]
        });
        console.log("Login error", err.error.message);
      });
  }

  deleteEvidence(evd_id){
    
  }

}
