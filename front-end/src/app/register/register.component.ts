import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public errMsg:string="";

  constructor(private authservice: AuthService, private fb: FormBuilder, public router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: [''],
      password: [''],
      email: [''],
      contact: []
    });
  }

  public get username()  {
    return this.registerForm.controls.username;
  }

  public get password()  {
    return this.registerForm.controls.password;
  }

  public get email()  {
    return this.registerForm.controls.password;
  }

  public get contact()  {
    return this.registerForm.controls.contact;
  }

  onSubmit() 
  {
    const username: string = this.registerForm.get('username').value;
    const password: string = this.registerForm.get('password').value;
    const email: string = this.registerForm.get('email').value;
    const contact: string = this.registerForm.get('contact').value;
    this.authservice.register(username,password,contact,email).subscribe(
      user => {
        this.router.navigate(['/login']);
      },
      error => {
        this.errMsg=error.error.message;
      }
    );
  }

  login()
  {
    this.router.navigate(['/login']);
  }

}
