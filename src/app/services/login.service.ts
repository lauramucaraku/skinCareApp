import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {map, tap, switchMap} from "rxjs/operators"
import {Router} from "@angular/router";
import {LogedInService} from "./loged-in.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly url: string;

  loggedInUser?: any;
  private loggedInUser$ = new BehaviorSubject(this.loggedInUser);
  loggedInUserObserver = this.loggedInUser$.asObservable();

  constructor(private httpClient: HttpClient, private router: Router, private logedInService: LogedInService) {
    this.url = environment.baseUrl+'/users';

    this.logedInService.getLoggedIn().subscribe(users=>{
      if (users.length) {
        const [user] = users;

        this.loggedInUser = user;
        this.loggedInUser$.next(this.loggedInUser);
      }
    });
  }

 login(userLoggedIn: any) {
   this.httpClient
     .get<any>(this.url)
     .pipe(
        map(res => {
          return res.find((val:any)=> val.email===userLoggedIn.email && val.password===userLoggedIn.password);
        }),
        tap(
          user=>{
           if(user) {
             this.loggedInUser = user;
             this.loggedInUser$.next(this.loggedInUser);

             localStorage.setItem('token', user.token);
             localStorage.setItem('role', user.role);

             this.router.navigate([user.role]);
           } else {
             alert('User not found. Please login with your correct credentials, or sign up if you do not have an account!');
             this.router.navigate(['login']);
           }
         },
         err=>{
           alert('Something went wrong!')
         }
       ),
       switchMap(user => this.createUser(user))
   )
       .subscribe();
 }

 createUser(user: any): Observable<any> {
    console.log('User inside createUser: ', user);
    return this.httpClient.post(environment.baseUrl+'/loggedInUser', user);
 }

 updateUser(user: any) {
    if (this.loggedInUser) {
      this.loggedInUser = {
        ...this.loggedInUser,
        ...user
      };
    } else {
      this.loggedInUser = { ...user };
    }

    this.loggedInUser$.next(this.loggedInUser);
 }
}
