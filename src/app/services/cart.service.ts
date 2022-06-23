import {Injectable} from '@angular/core';
import {ProductModel} from "../models/product.model";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  logedInUser?: any;
  users?: any;
  readonly url: string;

  constructor(private httpClient: HttpClient, private loginService: LoginService) {
    this.url = environment.baseUrl + '/users';
  }

  create(product: ProductModel) {
    const {loggedInUser} = this.loginService;

    if (loggedInUser) {
      this.logedInUser = loggedInUser;
      this.logedInUser.productIds.push(product.id);

      this.httpClient.patch(environment.baseUrl + '/loggedInUser/' + this.logedInUser.id,
        {"productIds": this.logedInUser.productIds}).subscribe(user => {
        this.loginService.updateUser(user);
      });

      this.httpClient.patch(this.url + '/' + this.logedInUser.id,
        {"productIds": this.logedInUser.productIds}).subscribe();
    }
  }

  deleteProduct(product: ProductModel) {
    console.log('PRODUCT ID: ', product.id);
    const {loggedInUser} = this.loginService;

    if (loggedInUser) {
      this.logedInUser = loggedInUser;
      this.logedInUser.productIds.splice(this.logedInUser.productIds.indexOf(product.id), 1);

      this.httpClient.patch(environment.baseUrl + '/loggedInUser/' + this.logedInUser.id,
        {"productIds": this.logedInUser.productIds}).subscribe(res => {
        this.loginService.updateUser(res);
      });

      this.httpClient.patch(this.url + '/' + this.logedInUser.id,
        {"productIds": this.logedInUser.productIds}).subscribe();
    }
  }

  deleteProducts() {
    const {loggedInUser} = this.loginService;
    if (loggedInUser) {
      this.logedInUser = loggedInUser;
      this.logedInUser.productIds = [];

      this.httpClient.patch(environment.baseUrl + '/loggedInUser/' + this.logedInUser.id,
        {"productIds": this.logedInUser.productIds}).subscribe(res => {
        this.loginService.updateUser(res);
      });

      this.httpClient.patch(this.url + '/' + this.logedInUser.id,
        {"productIds": this.logedInUser.productIds}).subscribe();
    }
  }

}
