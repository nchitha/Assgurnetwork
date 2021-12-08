import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map,tap} from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { NgxSpinnerService } from "ngx-bootstrap-spinner";

@Injectable({
  providedIn: 'root'
})
export class EngagementService {

  constructor(private http: HttpClient,private spinner: NgxSpinnerService) { }

  fetchSchedule(status:any){
    this.spinner.show();
    const enggId = this.getCurEnggLocal()['id'];
    return this.http.get<any>(`${environment.apiUrlAdmin}audit/shedule/${enggId}?status=${status}`)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));
  }

  getCurEnggLocal() {
      return JSON.parse(localStorage.getItem('curEngg') || '{}');
  }

  setCurEnggLocal(engg: any): void {
    localStorage.setItem('curEngg', JSON.stringify(engg));
  }

  uploadSchedule(event:any){
    const formdata = new FormData();
    const enggId = this.getCurEnggLocal()['id'];
    formdata.append('engagementId', enggId);
    formdata.append('shedule', event);
    this.spinner.show();
    return this.http.post(`${environment.apiUrlAdmin}/audit/shedule`, formdata)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));

  }

  demomethod(clientEngagementId:any):  Promise<any> {
    return this.http.get(`https://cpat-test-nodejs.azurewebsites.net/api/v1/engagement/sales/${clientEngagementId}`).toPromise();
    console.log("request passed");
  }
  demomethod2(clientEngagementId:any):  Promise<any> {
    return this.http.get(`https://cpat-test-nodejs.azurewebsites.net/api/v1/engagement/afterSales/${clientEngagementId}`).toPromise();
    console.log("request passed");
  }
  demomethod3(clientEngagementId:any):  Promise<any> {
    return this.http.get(`https://cpat-test-nodejs.azurewebsites.net/api/v1/audit/progress/${clientEngagementId}`).toPromise();
    console.log("request passed");
  }
  
  
  demomethod4(clientEngagementId:any,checkList_type_id:any):  Promise<any> {
    return this.http.get(`https://cpat-test-nodejs.azurewebsites.net/api/v1/engagement/nonComplaintKPIs/${clientEngagementId}?checkListType=${checkList_type_id}`).toPromise();
    
  }

  getAllDealers(engID:string,checklistType:any){
    return this.http.get(`https://cpat-test-nodejs.azurewebsites.net/api/v1/dealer/all/${engID}?checkListId=${checklistType}`)
  }

  getDealerDetails(dealerId:string){
    return this.http.get(`https://cpat-test-nodejs.azurewebsites.net/api/v1/dealer/details/${dealerId}`);
  }

  getDealerScores(engId:string,checklistType:string,dealerId:string){
    return this.http.get(`https://cpat-test-nodejs.azurewebsites.net/api/v1/engagement/dealer/level/score/${engId}?checkListType=${checklistType}&dealerId=${dealerId}`)
  }

  getDealerCategoryLevelScore(engId:string,checklistType:string,category:string){
    return this.http.get(`https://cpat-test-nodejs.azurewebsites.net/api/v1/engagement/category/level/score/${engId}?checkListType=${checklistType}&category='${category}'`);
  }

  getDealerNationalLevelScore(engId:string,checklistType:string){
    return this.http.get(`https://cpat-test-nodejs.azurewebsites.net/api/v1/engagement/national/level/score/${engId}?checkListType=${checklistType}`);
  }

  getDealerAreaDetails(engId:string,checklistType:string,dealerId:string){
    return this.http.get(`https://cpat-test-nodejs.azurewebsites.net/api/v1/engagement/dealer/level/audit/area/dynamic?engagementId=${engId}&checkListId=${checklistType}&dealerId=${dealerId}`)
  }

  getDealerLevelKPIDropDownData(engId:string,checklistType:string,dealerId:string){
    return this.http.get(`https://cpat-test-nodejs.azurewebsites.net/api/v1/engagement/dealer/level/dropdown/${engId}/${dealerId}?checkListId=${checklistType}`)
  }

  getDealerLevelKPIList(payload:any):Promise<any>{
    return this.http.post(`https://cpat-test-nodejs.azurewebsites.net/api/v1/engagement/dealer/kpi/level/search`,payload).toPromise()
  }

}
