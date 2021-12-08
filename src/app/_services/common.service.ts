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

  getUserAnalytics() {
    this.spinner.show();
    return this.http.get<any>(`${environment.apiUrl}user/type/count`)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));

  }

  getUsersByRole(role_id:any) {
    this.spinner.show();
    return this.http.get<any>(`${environment.apiUrl}user/all/${role_id}`)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));

  }

  getDealers() {
    this.spinner.show();
    return this.http.get<any>(`${environment.apiUrlAdmin}/dealer/all`)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));

  }

  deleteDealers(id: any){
    this.spinner.show();
    return this.http.delete(`${environment.apiUrlAdmin}/dealer/${id}`)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));
  }

  addDealer(dealers: any) {
    let params = {
      dealerName : dealers.dealer,
      dealerCategory:dealers.dealerCategory,
      investorId:dealers.investors,
      dealerCode:dealers.dealerCode
    }
    this.spinner.show();
    return this.http.post(`${environment.apiUrlAdmin}dealer`, params)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));

  }

  updateDealers(dealers: any,id: any,investorsName:any) {
    let params = {
      dealerName : dealers.dealer,
      dealerCategory:dealers.dealerCategory,
      //investorName:investorsName,
      dealerCode:dealers.dealerCode,
      investorId:dealers.investors
    }
    this.spinner.show();
    return this.http.put(`${environment.apiUrlAdmin}dealer/${id}`, params)
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
    return this.http.post(`${environment.apiUrlAdmin}/dealers/bulk`, formdata)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));

  }

  getInvestors() {
    this.spinner.show();
    return this.http.get<any>(`${environment.apiUrlAdmin}/investor/all`)
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
    return this.http.get<any>(`${environment.apiUrlAdmin}/store/all`)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));

  }

  addOutlets(outlet: any) {
    let params = {
      dealerId : outlet.dealers,
      storeName:outlet.outlet,
      storeTypeId:outlet.outletType,
      address:outlet.address,
      city:outlet.city,
      state:outlet.state,
      zone:outlet.zone
    }
    this.spinner.show();
    return this.http.post(`${environment.apiUrlAdmin}store`, params)
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
    return this.http.put(`${environment.apiUrlAdmin}store/${storeId}`, params)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));

  }

  deleteOutlets(id: any){
    this.spinner.show();
    return this.http.delete(`${environment.apiUrlAdmin}/store/${id}`)
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
    return this.http.get<any>(`${environment.apiUrlAdmin}/engagement/all`)
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

  addUser(UserData:any, type:any) {
    UserData.roleId = type;
    UserData.clientId = "1";
    this.spinner.show();
    return this.http.post(`${environment.apiUrl}/user`, UserData)
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


