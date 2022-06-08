import { Component, OnInit } from '@angular/core';
import {LogedInService} from "../../services/loged-in.service";
import {MatDialog} from "@angular/material/dialog";
import {PopupComponent} from "../popup/popup.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userLoggedIn?: any;

  constructor(private logedInService: LogedInService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.logedInService.getLoggedIn().subscribe(val=>{
      this.userLoggedIn = val;
    })
  }

  addNewProduct() {
    this.dialog.open(PopupComponent);
  }

  logout(user: any) {
    if(user.role=='admin') {
      if(confirm('Admin, are you sure you want to logout?')) {
        this.logedInService.logoutUser(user).subscribe();
      }
    } else if (user.role=='user') {
      if(confirm('User, are you sure you want to logout?')) {
        this.logedInService.logoutUser(user).subscribe();
      }
    }

  }

}
