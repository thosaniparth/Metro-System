import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddCouponComponent } from './add-coupon/add-coupon.component';
import { AddRouteComponent } from './add-route/add-route.component';
import { ViewCouponsComponent } from './view-coupons/view-coupons.component';
import { ViewRoutesComponent } from './view-routes/view-routes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddBalanceComponent } from './add-balance/add-balance.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ViewPaymentsComponent } from './view-payments/view-payments.component';


const routes: Routes = [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    },
    {
      path: 'login',
      redirectTo: 'login',
      pathMatch: 'full'
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'register',
      component: RegisterComponent
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
      children: [
        {path: '' , component: ViewRoutesComponent},
        {path: 'viewProfile', component: ViewProfileComponent},
        {path: 'viewPayments', component: ViewPaymentsComponent},
        {path: 'viewRoutes', component: ViewRoutesComponent},
        {path: 'viewCoupons', component: ViewCouponsComponent},
        {path: 'addBalance' , component: AddBalanceComponent},
        {path: 'addCoupon', component: AddCouponComponent},
        {path: 'addRoute', component: AddRouteComponent}
      ]
  
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
