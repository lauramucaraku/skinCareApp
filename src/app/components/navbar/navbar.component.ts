import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LogedInService} from "../../services/loged-in.service";
import {MatDialog} from "@angular/material/dialog";
import {PopupComponent} from "../popup/popup.component";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userLoggedIn?: any;
  nrOfItems?: number;

  constructor(private logedInService: LogedInService, private dialog: MatDialog) {
    this.nrOfItems = 0;
  }

  ngOnInit(): void {
    this.logedInService.getLoggedIn().subscribe(val=>{
      this.userLoggedIn = val;
      this.nrOfItems = val[0].productIds.length;
    })
  }

  addNewProduct() {
    this.dialog.open(PopupComponent);
  }

  logout(user: any) {
    if(user.role=='admin') {
      if(confirm(user.fullName+', are you sure you want to logout?')) {
        this.logedInService.logoutUser(user).subscribe();
        localStorage.removeItem('role');
        localStorage.removeItem('token')
      }
    } else if (user.role=='user') {
      if(confirm(user.fullName+', are you sure you want to logout?')) {
        this.logedInService.logoutUser(user).subscribe();
        localStorage.removeItem('role');
        localStorage.removeItem('token');
      }
    }
  }

}
