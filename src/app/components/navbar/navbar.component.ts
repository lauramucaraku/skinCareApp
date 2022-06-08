import { Component, OnInit } from '@angular/core';
import {LogedInService} from "../../services/loged-in.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userLoggedIn?: any;

  constructor(private logedInService: LogedInService) {
  }

  ngOnInit(): void {
    this.logedInService.getLoggedIn().subscribe(val=>{
      this.userLoggedIn = val;
    })
  }

  addNewProduct() {
    console.log(this.userLoggedIn);
  }

  logout(user: any) {
    if(confirm('Admin, are you sure you want to logout?')) {
      this.logedInService.logoutUser(user).subscribe();
    }
  }

}
