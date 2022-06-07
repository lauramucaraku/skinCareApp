import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LogedInService {

  readonly url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.baseUrl+'/loggedInUser';
  }

  getLoggedIn(): Observable<any> {
    return this.httpClient.get(this.url);
  }

}
