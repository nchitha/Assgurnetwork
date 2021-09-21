import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { NgxSpinnerService } from "ngx-bootstrap-spinner";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient,private spinner: NgxSpinnerService) { }
  getAnalytics() {
    this.spinner.show();
    return this.http.get<any>(`${environment.apiUrlAdmin}/dashboard/administrator`)
    .pipe(map(data => {
      this.spinner.hide();
      return data;
    }));

  }
}
