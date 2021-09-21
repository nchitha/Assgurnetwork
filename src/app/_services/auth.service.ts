import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor( private http: HttpClient) { }
  services(){
    return [1,2,4,5];
  }

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

    return this.http.post(`${environment.apiUrl}/user/login`, params, { headers: headers });

  }
}
