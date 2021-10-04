import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpHeaders,HttpErrorResponse
} from '@angular/common/http';
import {Router, Routes} from '@angular/router';
import { catchError, switchMap, tap} from "rxjs/operators";
import { Observable } from 'rxjs';
import { AuthService } from './_services/auth.service';

/** Inject With Credentials into the request */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    urlsToNotUse: Array<string>;
constructor (private router: Router,private authService:AuthService) {
    this.urlsToNotUse= [
        'user/login',
        'user/refresh-token'
        ];
    }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
        if (this.isValidRequestForInterceptor(req.url)) {
        let access_token = localStorage.getItem('access_token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${access_token}`, 
        });
          
        req = req.clone({
            headers,
            withCredentials: true
        });
        return next.handle(req).pipe(catchError((err:any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                   return this.authService.refreshToken().pipe(
                        switchMap((token: any) => {
                        localStorage.setItem('access_token',token.accessToken);
                        localStorage.setItem('refresh_token',token.refreshToken);
                        return next.handle(this.injectToken(req));
                    }))
                }
            }
            return next.handle(req);
    }));
    }

    return next.handle(req);
  }

  injectToken(request: HttpRequest<any>) {
    let access_token = localStorage.getItem('access_token');
    return request.clone({
        setHeaders: {
            Authorization: `Bearer ${access_token}`
        }
    });
}

  private isValidRequestForInterceptor(requestUrl: string): boolean {
    let positionIndicator: string = 'api/';
    let position = requestUrl.indexOf(positionIndicator);
    if (position > 0) {
      let destination: string = requestUrl.substr(position + positionIndicator.length);
      for (let address of this.urlsToNotUse) {
        if (new RegExp(address).test(destination)) {
          return false;
        }
      }
    }
    return true;
  }
}