import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public admin: boolean;
  public username: string;
  public navLinks: any;
  public role: string;
  public navInfo: any = [
    {
      role: 'user',
      links: [
        {tag: 'View Profile', link: './viewProfile'},
        {tag: 'View Payments', link: './viewPayments'},
        {tag: 'View Routes', link: './viewRoutes'},
        {tag: 'View Coupons', link: './viewCoupons'},
        {tag: 'Add Balance', link: './addBalance'}
      ]
    },
    {
      role: 'admin',
      links: [
        {tag: 'View Profile', link: './viewProfile'},
        {tag: 'View All Payments', link: './viewPayments'},
        {tag: 'View Routes', link: './viewRoutes'},
        {tag: 'View Coupons', link: './viewCoupons'},
        {tag: 'Add Route', link: './addRoute'},
        {tag: 'Add Coupon', link: './addCoupon'}
      ]
    },
  ]
  constructor(public router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem('currentUser')).username;
    this.admin = JSON.parse(localStorage.getItem('currentUser')).admin;
    this.admin==true?this.role = 'admin':this.role = 'user';
    this.navLinks = this.navInfo.find(element => {
      return element.role === this.role;
    });

  }

  logout()
  {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
