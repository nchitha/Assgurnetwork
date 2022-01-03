import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map,tap} from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { NgxSpinnerService } from "ngx-bootstrap-spinner";

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  constructor(private http: HttpClient,private spinner: NgxSpinnerService) { }

  fetchAudit(status:any){
    this.spinner.show();
    return this.http.get<any>(`${environment.apiUrlAdmin}audit/shedule/status/${status}`)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));
  }

  getAuditQuesResponse(eng_id,store_id,bucket,category,isMarkedChecked,isFlaggedChecked,isUnansweredChecked){
    return this.http.get<any>(`${environment.apiUrlAdmin}audit/answer/${eng_id}/${store_id}?areaLevel=${category}&bucketLevel=${bucket}&markAsNo=${isMarkedChecked}&isUnansweredChecked=${isFlaggedChecked}&flaggedForReview=${isFlaggedChecked}`)
    .pipe(tap(data => {
      return data;
    },error => {
    }));
  }
  getCategory(eng_id){
    return this.http.get<any>(`${environment.apiUrlAdmin}category/all/${eng_id}?checkListType=1`)
    .pipe(tap(data => {
      return data;
    },error => {
    }));
  }

  getBucket(eng_id){
    return this.http.get<any>(`${environment.apiUrlAdmin}bucket/all/${eng_id}?checkListType=1`)
    .pipe(tap(data => {
      return data;
    },error => {
    }));
  }

  auditAnswer(params){
    this.spinner.show();
    console.log(params);
    return this.http.post(`${environment.apiUrlAdmin}/audit/answer`, params)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));
  }

  auditPutAnswer(params,answerId){
    this.spinner.show();
    console.log(params);
    return this.http.put(`${environment.apiUrlAdmin}/audit/answer/${answerId}`, params)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));
  }

  auditAnswerEvidenceSubmit(answer_id,params){
    this.spinner.show();
    console.log(params);
    return this.http.post(`${environment.apiUrlAdmin}/evidence/${answer_id}`, params)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));
  }

  auditAnswerEvidenceGet(answer_id){
    this.spinner.show();
    return this.http.get(`${environment.apiUrlAdmin}/evidence/answer/${answer_id}`)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));
  }

  getDeakerReviewResponse(eng_id,store_id,bucket,category,isMarked,quickWin){
    return this.http.get<any>(`${environment.apiUrlAdmin}audit/review/${eng_id}/${store_id}?categoryLevel=${category}&bucketLevel=${bucket}&quickWin=${quickWin}&isMarked=${isMarked}`)
    .pipe(tap(data => {
      return data;
    },error => {
    }));
  }

  putStatusAudit(status:any,auditId:any){
    this.spinner.show();
    return this.http.put<any>(`${environment.apiUrlAdmin}audit/shedule/${auditId}`,{status})
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));
  }
}
