import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LogedInService} from "../../services/loged-in.service";
import {MatDialog} from "@angular/material/dialog";
import {PopupComponent} from "../popup/popup.component";
import {UserModel} from "../../models/user.model";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userLoggedIn: any;
  nrOfItems: number;
  role: string;

  constructor(private logedInService: LogedInService, private dialog: MatDialog,
              private cd: ChangeDetectorRef, private loginService: LoginService) {
    this.nrOfItems = 0;
    this.role = localStorage.getItem('role') as string;
  }

  ngOnInit(): void {
    this.loginService.loggedInUserObserver
      .subscribe(user=>{
        if (user) {
          this.userLoggedIn = user;
          this.role = this.userLoggedIn.role;
          this.nrOfItems = user.productIds?.length || 0;
        }
      });
    // this.logedInService.getLoggedIn().subscribe(val=>{
    //   this.userLoggedIn = val;
    //   this.nrOfItems = val[0].productIds.length;
    // })
    this.cd.detectChanges();
  }

  addNewProduct() {
    this.dialog.open(PopupComponent);
  }

  logout(user: any) {
    if (user) {
      if(user.role=='admin') {
        if(confirm(user.fullName + ', are you sure you want to logout?')) {
          this.logedInService.logoutUser(user).subscribe(() => this.userLoggedIn = undefined);
          localStorage.removeItem('role');
          localStorage.removeItem('token')
        }
      } else if (user.role=='user') {
        if(confirm(user.fullName+', are you sure you want to logout?')) {
          this.logedInService.logoutUser(user).subscribe(() => this.userLoggedIn = undefined);
          localStorage.removeItem('role');
          localStorage.removeItem('token');
        }
      }
    }
  }

}
