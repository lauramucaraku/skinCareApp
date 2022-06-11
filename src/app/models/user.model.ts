export interface UserModel {
  fullName: string;
  mobileNo: number;
  email: string;
  password: string;
  role: string;
  productIds: [];
  token: string;
  id: number
}

export class UserModel {
  static create(model: UserModel): UserModel {
    return {...model,};
  }
}
