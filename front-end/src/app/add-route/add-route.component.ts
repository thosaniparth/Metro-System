import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.css']
})
export class AddRouteComponent implements OnInit {

  public addRouteForm: FormGroup;
  public errMsg:string="";

  constructor(private routeservice: RouteService, private fb: FormBuilder, public router: Router) { }

  ngOnInit() {
    this.addRouteForm = this.fb.group({
      a: [''],
      b: [''],
      price: ['']
    });
  }

  public get a()  {
    return this.addRouteForm.controls.a;
  }

  public get b()  {
    return this.addRouteForm.controls.b;
  }

  public get price()  {
    return this.addRouteForm.controls.price;
  }

  onSubmit() 
  {
    const a: string = this.addRouteForm.get('a').value;
    const b: string = this.addRouteForm.get('b').value;
    const price: string = this.addRouteForm.get('price').value;
    this.routeservice.addRoute(a,b,price).subscribe(
      res => {
          this.router.navigate(['/dashboard']);
      },
      error => {
        this.errMsg=error.error.message;
      }
    );
  }
}
