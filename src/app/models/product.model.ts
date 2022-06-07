export interface ProductModel {
  title: string;
  price: number;
  description: string;
  category: string;
  imgUrl: string;
  quantity: number;
}

export class ProductModel {
  static create(model: ProductModel): ProductModel {
    return {...model,};
  }
}
