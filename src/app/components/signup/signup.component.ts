import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
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
      fullName: ['', Validators.required],
      mobileNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9]+@[a-z]+\\.[a-z]{2,3}$")]],
      password: ['', Validators.required]
    })
  }

  register() {
    if(this.signupForm.valid) {
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
    else alert('User not created!')
  }

}
