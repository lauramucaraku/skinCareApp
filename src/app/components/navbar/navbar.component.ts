import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {LogedInService} from "../../services/loged-in.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userLoggedIn?: any;

  constructor(private logedInService: LogedInService) { }

  ngOnInit(): void {
    this.logedInService.getLoggedIn().subscribe(val=>{
      this.userLoggedIn = val;
    })
  }

}
