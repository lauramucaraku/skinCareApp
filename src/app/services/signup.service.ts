import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  readonly url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.baseUrl+'/users';
  }

  signUp(form: FormGroup): Observable<any> {
    console.log('Form inside the sgnupService: ', form);
    return this.httpClient.post(this.url, form)
      .pipe(tap((res: any)=> localStorage.setItem('token', res.token)));
  }

  getUsers():Observable<any> {
    return this.httpClient.get(this.url);
  }

}
