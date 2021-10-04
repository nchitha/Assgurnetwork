import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map,tap} from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { NgxSpinnerService } from "ngx-bootstrap-spinner";
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient,private spinner: NgxSpinnerService) { }
  getAnalytics() {
    this.spinner.show();
    return this.http.get<any>(`${environment.apiUrlAdmin}dashboard/administrator`)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));

  }

  getUsers() {
    this.spinner.show();
    return this.http.get<any>(`${environment.apiUrl}user/all`)
    .pipe(tap(data => {
      return data;
    },error => {
    }));

  }

  getDealers() {
    this.spinner.show();
    return this.http.get<any>(`${environment.apiUrlAdmin}/dealerNew/getAllDealers`)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));

  }

  deleteDealers(id: any){
    return this.http.delete(`${environment.apiUrlAdmin}/dealerNew/deleteDealer/${id}`)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));
  }

  addDealer(dealers: any) {
    let params = {
      dealer_name : dealers.dealer,
      dealer_category:dealers.dealerCategory,
      investor_id:dealers.investors,
      dealer_code:dealers.dealerCode
    }
    this.spinner.show();
    return this.http.post(`${environment.apiUrlAdmin}/dealerNew/addDealer`, params)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));

  }

  updateDealers(dealers: any,id: any) {
    let params = {
      dealer_name : dealers.dealer,
      dealer_category:dealers.dealerCategory,
      investor_id:dealers.investors,
      dealer_code:dealers.dealerCode
    }
    this.spinner.show();
    return this.http.post(`${environment.apiUrlAdmin}dealerNew/updateDealer/${id}`, params)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));

  }

  uploadDealers(event: any) {
    const formdata = new FormData();
    formdata.append('dealers', event);
    this.spinner.show();
    return this.http.post(`${environment.apiUrlAdmin}/dealerNew/bulkUpload`, formdata)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));

  }

  getInvestors() {
    this.spinner.show();
    return this.http.get<any>(`${environment.apiUrlAdmin}/investor/all/new`)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));

  }

  addInvestor(investors: any) {
    let params = {
      investorName : investors.investor
    }
    this.spinner.show();
    return this.http.post(`${environment.apiUrlAdmin}/investor`, params)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));

  }

  uploadInvestors(event: any) {
    const formdata = new FormData();
    formdata.append('investors', event);
    this.spinner.show();
    return this.http.post(`${environment.apiUrlAdmin}/investor/bulk`, formdata)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));

  }

  deleteInvestors(id: any){
    return this.http.delete(`${environment.apiUrlAdmin}/investor/${id}`)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));
  }
  updateInvestor(id:any, name:any) {
    let params = {
      investorName : name

    }
    this.spinner.show();
    return this.http.put(`${environment.apiUrlAdmin}/investor/${id}`, params)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));
  }
}


