import { Component, OnInit } from '@angular/core';
import { CouponService } from '../services/coupon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-coupons',
  templateUrl: './view-coupons.component.html',
  styleUrls: ['./view-coupons.component.css']
})
export class ViewCouponsComponent implements OnInit {
  public coupons: [];
  public errMsg: string;
  constructor(private couponservice: CouponService, public router: Router) { }

  ngOnInit() {
    this.getCoupons();
  }

  getCoupons()
  {
    this.couponservice.viewCoupons().subscribe(
      coupons=>
      {
        this.coupons = coupons;
        console.log(coupons);
      },
      error=>
      {
        this.errMsg=error.error.message;
      }
    )
  }

}
