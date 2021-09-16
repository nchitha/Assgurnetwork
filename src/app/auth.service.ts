import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoints = {
    login: 'user/login'
  }
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
      username: credentials.username,
      password: credentials.password,
      // client_id: "maruthi-suzuki",
      // client_secret: "test",
      // scope: ""
    }

    // Object.keys(params).forEach(key => {
    //   body.set(key, params[key]);
    // });

    return this.http.post(`https://cpat-new-user-app.azurewebsites.net/instore/v1/${this.endpoints.login}`, params, { headers: headers });

  }
}
