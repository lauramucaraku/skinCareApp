import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {FormGroup} from "@angular/forms";
import {ProductModel} from "../../models/product.model";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  productList?: ProductModel[];
  productList$ = new BehaviorSubject(this.productList);

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
  }

  addProduct(form?: FormGroup): void {
    if (form && form.valid) {
      let product = form.getRawValue();
      console.log('Product from the addProduct method: ', product);
      this.productService.addProduct(product).subscribe();
      alert('Product added to list!');

      this.productService.getProductsList().subscribe(val=>{
        this.productList = val;
      })
    }
  }

}
