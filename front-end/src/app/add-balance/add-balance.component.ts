import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-balance',
  templateUrl: './add-balance.component.html',
  styleUrls: ['./add-balance.component.css']
})
export class AddBalanceComponent implements OnInit {
  // public user: any;
  // public role: string;

  public addBalanceForm: FormGroup;
  public errMsg:string="";
  public step = 0;
  public currentWalletBalance:number=0;
  constructor(private authservice: AuthService, private fb: FormBuilder, public router: Router) { }

  ngOnInit() {
    this.addBalanceForm = this.fb.group({
      walletBalance: ['']
    });
    this.step = 0;
    this.currentWalletBalance = 0;
    this.getBalance();
  }

  getBalance()
  {
    this.authservice.viewProfile().subscribe(
        user=>
        {
          this.currentWalletBalance = user.walletBalance;
        },
        error=>
        {
          this.errMsg=error.error.message;
        }
    )
  }


  public get walletBalance()  {
    return this.addBalanceForm.controls.walletBalance;
  }

  onSubmit()
  {
    const walletBalance: number = this.addBalanceForm.get('walletBalance').value;
    this.authservice.addBalance(walletBalance).subscribe(
      res=>
      {
        this.step++;
      },
      error=>
      {
        this.errMsg=error.error.message;
      }
    )
  }

  back()
  {
    this.ngOnInit();
  }

}
