import { Component, OnInit } from '@angular/core';
import {ProductModel} from "../../models/product.model";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  productList?: ProductModel[];
  newProduct?: ProductModel;

  constructor(private productsService: ProductsService) {
    this.productList = [];
  }

  ngOnInit(): void {
    this.productsService.getProductsList().subscribe(val=>{
      this.productList = val;
    })
    this.productsService.receiveProduct().subscribe(product=>{
      this.newProduct = product;
      console.log(product);
    })
  }

  delete(product: ProductModel) {
    if(confirm('Are you sure you want to delete this product?')) {
      this.productsService.delete(product).subscribe();
      this.productsService.getProductsList().subscribe(val=>{
        this.productList = val;
      })
    }
  }

}
