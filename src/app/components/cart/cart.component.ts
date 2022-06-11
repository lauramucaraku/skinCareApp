import { Component, OnInit } from '@angular/core';
import {ProductModel} from "../../models/product.model";
import {LogedInService} from "../../services/loged-in.service";
import {ProductsService} from "../../services/products.service";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  productList: ProductModel[] = [];
  productsId: [];
  totalAmount?: number;
  user: any;

  constructor(private logedInService: LogedInService, private productService: ProductsService,
              private cartService: CartService) {
    this.productsId = [];
  }

  ngOnInit(): void {
    this.logedInService.getLoggedIn().subscribe(val=>{
      this.user = val;
     this.productsId = val[0].productIds;
      for(let product of this.productsId) {
        this.productService.getProduct(product).subscribe(res=>{
          this.productList.push(res);
        });
      }
    });

  }

  deleteProduct(product: ProductModel) {
    console.log('The product to be deleted is: ', product);
    this.cartService.deleteProduct(product);
  }

  deleteProducts() {
    this.cartService.deleteProducts();
  }

  calculateTotalAmount() {
  }

}
