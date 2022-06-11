import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {ProductModel} from "../../models/product.model";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  productsList: ProductModel[];

  constructor(private productsService: ProductsService) {
    this.productsList =[];
  }

  ngOnInit(): void {
    this.productsService.getProductsList()
      .subscribe(result=>{
        this.productsList = result;
      })
  }

}
