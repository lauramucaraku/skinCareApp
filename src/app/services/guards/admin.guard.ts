import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(): boolean{
    if(localStorage.getItem('role')=='admin')
      return true;
    else {
      this.router.navigate(['notfound']);
      return false;
    }
  }


}
