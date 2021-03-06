import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {LogedInService} from "../../services/loged-in.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  public loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService,
              private logedInService: LogedInService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  login() {
    this.loginService.login(this.loginForm.value);
    this.logedInService.getLoggedIn().subscribe();
    this.router.navigate(['products']);
  }

}
