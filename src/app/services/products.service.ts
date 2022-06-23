import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {ProductModel} from "../models/product.model";
import {LogedInService} from "./loged-in.service";
import {SignupService} from "./signup.service";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly url: string;
  products?: ProductModel;
  private products$ = new Subject<any>();

  constructor(private httpClient: HttpClient, private logedInService: LogedInService,
              private signupService: SignupService) {
    this.url = environment.baseUrl+'/products';
  }

  getProductsList(): Observable<ProductModel[]> {
    return this.httpClient
      .get<ProductModel[]>(this.url);
  }

  getProduct(id: number): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>(this.url+'/'+id);
  }

  addProduct(product: ProductModel): Observable<any> {
    this.products$.next(product);
    return this.httpClient.post(this.url, product);
  }

  receiveProduct(): Observable<any> {
    return this.products$.asObservable();
  }

  delete(product: any) {
    let productUrl = this.url+'/'+product.id;
    return this.httpClient.delete(productUrl);
  }

}
