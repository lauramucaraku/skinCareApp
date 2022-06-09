import { Component, OnInit } from '@angular/core';
import {ProductModel} from "../../models/product.model";
import {LogedInService} from "../../services/loged-in.service";
import {ProductsService} from "../../services/products.service";

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

  constructor(private logedInService: LogedInService, private productService: ProductsService) {
    this.productsId = [];
  }

  ngOnInit(): void {
    this.logedInService.getLoggedIn().subscribe(val=>{
      this.user = val;
     console.log('Val: ', val[0].productIds);
     this.productsId = val[0].productIds;
      for(let product of this.productsId) {
        this.productService.getProduct(product).subscribe(res=>{
          console.log('Res returned by the getProduct(product) method: ', res)
          this.productList.push(res);
        });
      }
    });

  }

  deleteProduct(product: ProductModel) {
  }

  deleteProducts() {
  }

  calculateTotalAmount() {
  }

}
