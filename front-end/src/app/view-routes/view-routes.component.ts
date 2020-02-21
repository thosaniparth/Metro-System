import { Component, OnInit } from '@angular/core';
import { RouteService } from '../services/route.service';
import { Router } from '@angular/router';
import { CouponService } from '../services/coupon.service';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-view-routes',
  templateUrl: './view-routes.component.html',
  styleUrls: ['./view-routes.component.css']
})
export class ViewRoutesComponent implements OnInit {

  public routes: [any];
  public coupons: [any];
  public errMsg: string='';
  public step = 0;
  public a: string = '';
  public b: string = '';
  public orgPrice = 0;
  public finalPrice = 0;
  public couponCode:string = '';
  public coupoCodeApplied: boolean = false;
  public admin: boolean;
  constructor(private routeservice: RouteService,private couponservice: CouponService, private paymentservice: PaymentService, public router: Router) { }

  ngOnInit() {
    this.getRoutes();
    this.step = 0;
    this.a = '';
    this.b = '';
    this.orgPrice = 0;
    this.finalPrice = 0;
    this.couponCode = '';
    this.coupoCodeApplied = false;
    this.admin = JSON.parse(localStorage.getItem('currentUser')).admin;
  }

  getRoutes()
  {
    this.routeservice.viewRoutes().subscribe(
      routes=>
      {
        this.routes = routes;
        this.step = 0;
      },
      error=>
      {
        this.errMsg=error.error.message;
      }
    )
  }

  selectRoute(route,x)
  {
    if(x==0)
    {
      this.a = route.a;
      this.b = route.b;
    }
    else
    {
      this.a = route.b;
      this.b = route.a;
    }
    this.orgPrice = route.price;
    this.finalPrice = this.orgPrice;
    this.couponservice.viewCoupons().subscribe(
      coupons=>
      {
        this.coupons = coupons;
        this.step++;
      },
      error=>
      {
        this.errMsg=error.error.message;
      }
    )
  }

  applyCoupon(coupon)
  {
    this.couponservice.applyCoupon(coupon.code, this.orgPrice).subscribe(
      res=>
      {
        this.finalPrice = res.finalPrice;
        this.coupoCodeApplied = true;
        this.couponCode = coupon.code;
        this.step++;
      },
      error=>
      {
        this.errMsg=error.error.message;
      }
    )
  }

  dontApplyCoupon()
  {
    this.step++;
    this.finalPrice = this.orgPrice;
    this.coupoCodeApplied = false;
    this.couponCode = '';
  }

  pay()
  {
    this.paymentservice.pay(this.couponCode,this.orgPrice, this.finalPrice, this.coupoCodeApplied, this.a, this.b).subscribe(
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

  close()
  {
    this.ngOnInit();
  }

  back()
  {
    this.step--;
    this.errMsg = '';
  }

}
