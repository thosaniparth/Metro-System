import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  pay(couponCode:string, price: any, finalPrice: any, couponCodeApplied: boolean, a: string, b:string)
  {
    const user = localStorage.getItem('currentUser');
    const userJ = JSON.parse(user);
    const username = userJ.username;
    return this.http.post<any>(`http://localhost:3000/payment/pay`,{ username, couponCode, price, finalPrice, couponCodeApplied, a, b }).pipe(map(res =>
    {
      return res;
    }));
  }

  viewPayments()
  {
    const user = localStorage.getItem('currentUser');
    const userJ = JSON.parse(user);
    const username = userJ.username;
    const admin = userJ.admin;
    return this.http.get<any>(`http://localhost:3000/payment/viewPayments?username=`+username+`&admin=`+admin).pipe(map(res =>
    {
      return res;
    }));
  }
}
