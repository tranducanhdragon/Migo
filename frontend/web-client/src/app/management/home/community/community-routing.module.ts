import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleConst } from 'src/environments/constant';
import { BookingDetailComponent } from './community-booking/booking-detail/booking-detail.component';
import { CommunityBookingComponent } from './community-booking/community-booking.component';
import { CommunityInforComponent } from './community-infor/community-infor.component';
import { CommunityMenuComponent } from './community-menu/community-menu.component';
import { CommunityRevenueComponent } from './community-revenue/community-revenue.component';
import { CommunityComponent } from './community.component';

const routes: Routes = [
    {
      path: '',component: CommunityComponent,
      children: [
        { 
          path: 'community-menu',
          canActivate: [AuthGuard],
          data: { Role: [RoleConst.Admin,RoleConst.User] },
          component: CommunityMenuComponent 
        },
        { 
          path: 'community-infor',
          canActivate: [AuthGuard],
          data: { Role: [RoleConst.Admin] },
          component: CommunityInforComponent 
        },
        { 
          path: 'community-revenue',
          canActivate: [AuthGuard],
          data: { Role: [RoleConst.Admin] },
          component: CommunityRevenueComponent 
        },
        { 
          path: 'community-booking',
          canActivate: [AuthGuard],
          data: { Role: [RoleConst.Admin, RoleConst.User] },
          component: CommunityBookingComponent,
        },
        {
          path:'booking-detail/:id', 
          canActivate: [AuthGuard],
          data: { Role: [RoleConst.Admin, RoleConst.User] },
          component:BookingDetailComponent,
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule { }