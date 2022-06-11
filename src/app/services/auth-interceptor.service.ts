import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token') as string;
    if(token) {
      const clonedReq = req.clone({headers: req.headers.set("Authorization", "Bearer "+token)});
      console.log('Modified req: ',clonedReq)
      return next.handle(clonedReq);
    }
    else {
      return next.handle(req);
    }
  }


}
