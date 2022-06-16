import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, Subject, tap} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly url: string;
  loggedInUser!: any;
  private _refreshrequired = new Subject<void>();

  get RefreshRequired() {
    return this._refreshrequired;
  }

  constructor(private httpClient: HttpClient, private router: Router) {
    this.url = environment.baseUrl+'/users';
  }

 login(userLoggedIn: any) {
    console.log('User inside the service: ', userLoggedIn)
   this.httpClient.get<any>(this.url)
       .subscribe(res=>{
         console.log('Res: ', res);
          const user = res.find((val:any)=>{
           return val.email===userLoggedIn.email && val.password===userLoggedIn.password;
         });
         if(user) {
            this.createUser(user).subscribe();
            localStorage.setItem('token', user.token);
            if(user.role=="admin") {
             localStorage.setItem('role', "admin");
           } else if(user.role=="user") {
             localStorage.setItem('role', "user");
           }
         } else {
           alert('User not found. Please login with your correct credentials, or sign up if you do not have an account!');
           this.router.navigate(['login']);
         }
       },
       err=>{
         alert('Something went wrong!')
       });
    return this.loggedInUser;
 }

 createUser(user: any): Observable<any> {
    console.log('User inside createUser: ', user);
    return this.httpClient.post(environment.baseUrl+'/loggedInUser', user);
 }

 getLoggedInUser() {
    return this.loggedInUser;
 }

}
