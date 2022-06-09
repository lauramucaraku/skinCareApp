import { Injectable } from '@angular/core';
import {ProductModel} from "../models/product.model";
import {LogedInService} from "./loged-in.service";
import {SignupService} from "./signup.service";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  logedInUser?: any;
  users?: any;
  readonly url: string;

  constructor(private httpClient: HttpClient, private logedInService: LogedInService,
              private signupService: SignupService) {
    this.url = environment.baseUrl+'/users';
  }

  create(product: any){
    console.log('Product id; ', product.id);
    this.logedInService.getLoggedIn().subscribe(user=>{
      console.log('Logedin user inside the service: ', user[0]);
      this.logedInUser = user[0];
      // console.log('Product id is: ', this.logedInUser.productIds.push(product.id));
      console.log(this.url+'/'+this.logedInUser.id);

      this.logedInUser.productIds.push(product.id);
      this.httpClient.patch(environment.baseUrl+'/loggedInUser/1',
        {"productIds": this.logedInUser.productIds}).subscribe();

      this.httpClient.patch(this.url+'/'+this.logedInUser.id,
        {"productIds": this.logedInUser.productIds}).subscribe();
    });

  }
}
