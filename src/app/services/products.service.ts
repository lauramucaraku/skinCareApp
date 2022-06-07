import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductModel} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.baseUrl+'/products';
  }

  getProductsList(): Observable<ProductModel[]> {
    return this.httpClient
      .get<ProductModel[]>(this.url);
  }

}
