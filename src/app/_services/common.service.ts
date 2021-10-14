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
    this.spinner.show();
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
      investor_id:dealers.engagement,
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

  updateDealers(dealers: any,id: any,investorsName:any) {
    let params = {
      dealer_name : dealers.dealer,
      dealer_category:dealers.dealerCategory,
      investor_name:investorsName,
      dealer_code:dealers.dealerCode
    }
    this.spinner.show();
    return this.http.put(`${environment.apiUrlAdmin}dealerNew/updateDealer/${id}`, params)
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
    this.spinner.show();
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

  getOutlets() {
    this.spinner.show();
    return this.http.get<any>(`${environment.apiUrlAdmin}/store/getAllStores`)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));

  }

  addOutlets(outlet: any) {
    let params = {
      dealerName : outlet.dealers,
      storeName:outlet.outlet,
      storeType:outlet.outletType,
      address:outlet.address,
      city:outlet.city,
      state:outlet.state,
      zone:outlet.zone
    }
    this.spinner.show();
    return this.http.post(`${environment.apiUrlAdmin}/store/addStore`, params)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));

  }

  editOutlet(outlet: any,storeId:any) {
    let params = {
      dealerName : outlet.dealers,
      storeName:outlet.outlet,
      storeType:outlet.outletType,
      address:outlet.address,
      city:outlet.city,
      state:outlet.state,
      zone:outlet.zone
    }
    this.spinner.show();
    return this.http.put(`${environment.apiUrlAdmin}store/updateStore/${storeId}`, params)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));

  }

  deleteOutlets(id: any){
    this.spinner.show();
    return this.http.delete(`${environment.apiUrlAdmin}/store/deleteStore/${id}`)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));
  }

  uploadOutlets(event: any) {
    const formdata = new FormData();
    formdata.append('stores', event);
    this.spinner.show();
    return this.http.post(`${environment.apiUrlAdmin}/store/bulkUpload`, formdata)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));

  }

  getEngagements() {
    this.spinner.show();
    return this.http.get<any>(`${environment.apiUrlAdmin}/engagement/all/new`)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));

  }

  addEngagement(engagement: any,file:any,file1:any) {
    const formdata = new FormData();
    formdata.append('sales', file);
    formdata.append('afterSales', file1);
    formdata.append('engagementName', engagement.name);
    formdata.append('engagementStartDate', engagement.startDate);
    formdata.append('engagementEndDate', engagement.endDate);
    formdata.append('version', engagement.version);
    this.spinner.show();
    return this.http.post(`${environment.apiUrlAdmin}/engagement`, formdata)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));

  }

  getUser(){
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}


