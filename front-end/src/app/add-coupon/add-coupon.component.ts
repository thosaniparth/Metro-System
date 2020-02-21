import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CouponService } from '../services/coupon.service';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent implements OnInit {

  public addCouponForm: FormGroup;
  public errMsg:string="";

  constructor(private couponservice: CouponService, private fb: FormBuilder, public router: Router) { }

  ngOnInit() {
    this.addCouponForm = this.fb.group({
      code: [''],
      percentoff: ['']
    });
  }

  public get code()  {
    return this.addCouponForm.controls.code;
  }

  public get percentoff()  {
    return this.addCouponForm.controls.percentoff;
  }

  onSubmit() 
  {
    const code: string = this.addCouponForm.get('code').value;
    const percentoff: string = this.addCouponForm.get('percentoff').value;
    this.couponservice.addCoupon(code,percentoff).subscribe(
      res => {
          this.router.navigate(['/admin']);
      },
      error => {
        this.errMsg=error.error.message;
      }
    );
  }
}
