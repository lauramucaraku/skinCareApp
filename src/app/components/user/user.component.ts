import { Component, OnInit } from '@angular/core';
import {ProductModel} from "../../models/product.model";
import {CartService} from "../../services/cart.service";
import {ProductsService} from "../../services/products.service";
import {LogedInService} from "../../services/loged-in.service";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  productList: ProductModel[];
  user!: UserModel;

  constructor(private cartService: CartService, private productsService: ProductsService,
              private logedInService: LogedInService) {
    this.productList = [];
  }

  ngOnInit(): void {
    this.productsService.getProductsList().subscribe(val=>{
      this.productList = val;
    });
    this.logedInService.getLoggedIn().subscribe(val=>{
      this.user = val[0];
      console.log('User inside UserComponent is: ', this.user);
      // localStorage.setItem('nrItems', JSON.stringify(this.user.productIds.length));
    })
  }

  addToCart(product: ProductModel) {
    console.log('Product is: ', product);
    if(confirm(this.user.fullName+ ', are you sure you want to add '+product.title+' to your cart?')) {
      this.cartService.create(product);
      this.logedInService.getLoggedIn().subscribe();
    }

  }

}
