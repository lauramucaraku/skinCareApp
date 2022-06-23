import {Component, OnInit} from '@angular/core';
import {ProductModel} from "../../models/product.model";
import {LogedInService} from "../../services/loged-in.service";
import {ProductsService} from "../../services/products.service";
import {CartService} from "../../services/cart.service";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  productList: ProductModel[] = [];
  user: UserModel[];
  productsId: [];
  totalAmount?: number;

  constructor(private logedInService: LogedInService, private productService: ProductsService,
              private cartService: CartService) {
    this.productsId = [];
    this.user = [];
  }

  ngOnInit(): void {
    this.logedInService.getLoggedIn().subscribe(val => {
      this.user = val;
      this.productsId = val[0].productIds;
      for (let product of this.productsId) {
        this.productService.getProduct(product).subscribe(res => {
          this.productList.push(res);
        });
      }
    });
  }

  deleteProduct(product: ProductModel) {
    console.log('The product to be deleted is: ', product);
    this.cartService.deleteProduct(product);

    this.productList = [];
    this.logedInService.getLoggedIn().subscribe(val => {
      this.user = val;
      this.productsId = val[0].productIds;
      console.log('Products ids inside DeleteProduct are: ', this.productsId);
      for (let id of this.productsId) {
        this.productService.getProduct(id).subscribe(res => {
          console.log('Res inside the subscriber of DeleteProduct:', res);
          this.productList.push(res); //this may be not correct
        });
      }
    });
  }

  deleteProducts() {
    this.cartService.deleteProducts();
    this.productList.length = 0;
    this.logedInService.getLoggedIn().subscribe(val => {
      if(val.productIds = []){
        this.productList = [];
      };
      console.log('ProductList====>', this.productList);
    });
  }

}
