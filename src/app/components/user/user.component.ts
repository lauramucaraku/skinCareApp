import { Component, OnInit } from '@angular/core';
import {ProductModel} from "../../models/product.model";
import {CartService} from "../../services/cart.service";
import {ProductsService} from "../../services/products.service";
import {LogedInService} from "../../services/loged-in.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  productList: ProductModel[];

  constructor(private cartService: CartService, private productsService: ProductsService,
              private logedInService: LogedInService) {
    this.productList = [];
  }

  ngOnInit(): void {
    this.productsService.getProductsList().subscribe(val=>{
      this.productList = val;
    });
  }

  addToCart(product: ProductModel) {
    console.log('Product is: ', product);
    this.cartService.create(product);
    this.logedInService.getLoggedIn().subscribe();
  }

}
