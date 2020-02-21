import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-payments',
  templateUrl: './view-payments.component.html',
  styleUrls: ['./view-payments.component.css']
})
export class ViewPaymentsComponent implements OnInit {
  public payments: any;
  public errMsg: string;
  constructor(private paymentservice: PaymentService, public router: Router) { }

  ngOnInit() {
    this.payments =[];
    this.errMsg ='';
    this.getPayments();
  }

  getPayments()
  {
    this.paymentservice.viewPayments().subscribe(
      res=>
      {
        this.payments = res;
      },
      error=>
      {
        this.errMsg=error.error.message;
      }
    )
  }

}
