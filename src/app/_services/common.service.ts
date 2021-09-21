import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }
  getAnalytics() {
    return this.http.get<any>(`${environment.apiUrlAdmin}/dashboard/administrator`)

  }
}
