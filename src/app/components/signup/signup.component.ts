import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {SignupService} from "../../services/signup.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  hide = true;
  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private signupService: SignupService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullName: [''],
      mobileNo: [''],
      email: [''],
      password: ['']
    })
  }

  register() {
    console.log('Value of the signup form inside register: ',this.signupForm.value)
    const rand = () => {
      return Math.random().toString(36).substr(2);
    };
    const token = () => {
      return rand() + rand();
    };
    let newUser = this.signupForm.value;
    newUser.role = "user";
    newUser.productIds = [];
    newUser.token = token();
    console.log('New user: ', newUser);
    this.signupService.signUp(newUser).subscribe(res=>{
      alert('User created!')
      this.signupForm.reset();
      this.router.navigate(['login']);
    });
  }

}
