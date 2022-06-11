import { Component, OnInit } from '@angular/core';
import {ProductModel} from "../../models/product.model";
import {ProductsService} from "../../services/products.service";
import {LogedInService} from "../../services/loged-in.service";
import {CartService} from "../../services/cart.service";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  userLoggedIn?: any;
  productList: ProductModel[];

  constructor(private productsService: ProductsService,
              private cartService: CartService,
              private logedInService: LogedInService) {
    this.productList = [];
  }

  ngOnInit(): void {
    this.productsService.getProductsList().subscribe(val=>{
      this.productList = val;
    });

    this.logedInService.getLoggedIn().subscribe(val=>{
      this.userLoggedIn = val;
      console.log('user logged in inside producst.ts: ', val);
    })
  }
  //
  // addToCart(product: ProductModel) {
  //   console.log('Product is: ', product);
  //   this.cartService.create(product);
  // }

}
