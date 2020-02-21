import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AddRouteComponent } from './add-route/add-route.component';
import { AddCouponComponent } from './add-coupon/add-coupon.component';
import { ViewRoutesComponent } from './view-routes/view-routes.component';
import { ViewCouponsComponent } from './view-coupons/view-coupons.component';
import { AddBalanceComponent } from './add-balance/add-balance.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ViewPaymentsComponent } from './view-payments/view-payments.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AddRouteComponent,
    AddCouponComponent,
    ViewRoutesComponent,
    ViewCouponsComponent,
    AddBalanceComponent,
    DashboardComponent,
    ViewProfileComponent,
    ViewPaymentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
