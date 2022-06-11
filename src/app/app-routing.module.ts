import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from "./components/signup/signup.component";
import {LoginComponent} from "./components/login/login.component";
import {MainPageComponent} from "./components/main-page/main-page.component";
import {AdminComponent} from "./components/admin/admin.component";
import {ProductsComponent} from "./components/products/products.component";
import {CartComponent} from "./components/cart/cart.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {AdminGuard} from "./services/guards/admin.guard";
import {UserComponent} from "./components/user/user.component";
import {UserGuard} from "./services/guards/user.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainPageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'notfound',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
