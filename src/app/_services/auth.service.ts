import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-bootstrap-spinner";
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor( private http: HttpClient,private spinner: NgxSpinnerService) { }

  login(credentials: any) {

    let params = {
      email : credentials.username,
      password: credentials.password
    }

    this.spinner.show();
    return this.http.post(`${environment.apiUrl}/user/login`, params)
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));

  }

  refreshToken() {

    const refresh_token = localStorage.getItem('refresh_token');
    this.spinner.show();
    return this.http.post(`${environment.apiUrl}/user/refresh-token`, {refreshToken: refresh_token})
    .pipe(tap(data => {
      this.spinner.hide();
      return data;
    },error => {
      this.spinner.hide();
    }));

  }
}
