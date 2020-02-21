import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  public user: any;
  public role: string;
  public errMsg: string;
  constructor(private authservice: AuthService, public router: Router) { }

  ngOnInit() {
    this.errMsg='';
    this.getUser();
  }

  getUser()
  {
    this.authservice.viewProfile().subscribe(
        user=>
        {
          this.user = user;
          this.user.admin?this.role='Admin':this.role='Customer';
        },
        error=>
        {
          this.errMsg=error.error.message;
        }
    )
  }

}
