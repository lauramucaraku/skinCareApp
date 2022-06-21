import { Injectable } from '@angular/core';
import {ProductModel} from "../models/product.model";
import {LogedInService} from "./loged-in.service";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../models/user.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  logedInUser?: any;
  users?: any;
  readonly url: string;
  currentList: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);

  constructor(private httpClient: HttpClient, private logedInService: LogedInService) {
    this.url = environment.baseUrl+'/users';
  }

  getCurrentList(products: ProductModel[]) {
    this.currentList.next(products);
  }

  create(product: ProductModel) {
    const { loggedInUser } = this.loginService;

    if (loggedInUser) {
      this.logedInUser = loggedInUser;
      this.logedInUser.productIds.push(product.id);

      this.httpClient.patch(environment.baseUrl+'/loggedInUser/'+ this.logedInUser.id,
        {"productIds": this.logedInUser.productIds}).subscribe(res=>{
        this.loginService.updateUser(res);
      });

      this.httpClient.patch(this.url+'/'+this.logedInUser.id,
        {"productIds": this.logedInUser.productIds}).subscribe();
    }
  }

  deleteProduct(product: ProductModel) {
    const { loggedInUser } = this.loginService;

    if (loggedInUser) {
      this.logedInUser = loggedInUser;

      this.logedInUser.productIds.splice(this.logedInUser.productIds.find((val: any)=>{
        val.id != product.id;
      }), 1);

      this.httpClient.patch(environment.baseUrl+'/loggedInUser/'+this.logedInUser.id,
        {"productIds": this.logedInUser.productIds}).subscribe(res=>{
          this.loginService.updateUser(res);
      });

      this.httpClient.patch(this.url+'/'+this.logedInUser.id,
        {"productIds": this.logedInUser.productIds}).subscribe();
    }
  }

  deleteProducts() {
    const { loggedInUser } = this.loginService;
    if(loggedInUser) {
      this.logedInUser = loggedInUser;
        this.logedInUser.productIds = [];

        this.httpClient.patch(environment.baseUrl+'/loggedInUser/'+this.logedInUser.id,
          {"productIds": this.logedInUser.productIds}).subscribe(res=>{
            this.logedInUser.updateUser(res);
        });

        this.httpClient.patch(this.url+'/'+this.logedInUser.id,
          {"productIds": this.logedInUser.productIds}).subscribe();
    }
  }

}
