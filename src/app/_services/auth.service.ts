import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-bootstrap-spinner";
import { map,tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor( private http: HttpClient,private spinner: NgxSpinnerService) { }

  login(credentials: any): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': '*/*', 'Content-Type': 'application/json;charset=utf-8'
    });

    let body = new URLSearchParams();

    let params = {
      // grant_type: "password",
      email : credentials.username,
      password: credentials.password,
      // client_id: "maruthi-suzuki",
      // client_secret: "test",
      // scope: ""
    }

    // Object.keys(params).forEach(key => {
    //   body.set(key, params[key]);
    // });
    this.spinner.show();
    return this.http.post(`${environment.apiUrl}/user/login`, params, { headers: headers })
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));

  }
}
