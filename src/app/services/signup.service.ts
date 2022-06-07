import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

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
    return this.httpClient.post(this.url, form);
  }

}
