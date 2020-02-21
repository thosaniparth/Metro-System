import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private http: HttpClient) { }

  addCoupon(code: string, percentageOff:string)
  {
    return this.http.post<any>(`http://localhost:3000/coupon/addCoupon`,{ code, percentageOff }).pipe(map(res=>
      {
        return res;
      }));
  }

  viewCoupons()
  {
    const user = localStorage.getItem('currentUser');
    const userJ = JSON.parse(user);
    const username = userJ.username;
    return this.http.get<any>(`http://localhost:3000/coupon/viewCoupons?username=`+username).pipe(map(coupons=>
    {
      return coupons;
    }));
  }

  applyCoupon(code: string,price: any)
  {
    const user = localStorage.getItem('currentUser');
    const userJ = JSON.parse(user);
    const username = userJ.username;
    return this.http.post<any>(`http://localhost:3000/coupon/applyCoupon`,{ username, code, price }).pipe(map(res=>
    {
      return res;
    }));
  }
}
