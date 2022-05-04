import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleConst } from 'src/environments/constant';
import { AdminBusinessComponent } from './admin-business/admin-business.component';
import { BuyerComponent } from './buyer/buyer.component';
import { CitizenComponent } from './citizen/citizen.component';
import { CommunityComponent } from './community/community.component';
import { HomeComponent } from './home.component';
import { SellerComponent } from './seller/seller.component';
import { OwnerInfoComponent } from './seller/shop-register/owner-info/owner-info.component';
import { ShopInfoComponent } from './seller/shop-register/shop-info/shop-info.component';
import { ShopRegisterComponent } from './seller/shop-register/shop-register.component';

const routes: Routes = [
    {
        path:'', component:HomeComponent,
        children:[
            {
                path: 'community',component: CommunityComponent,
                canActivate: [AuthGuard],
                data: { Role: [RoleConst.Admin, RoleConst.User] },
                loadChildren: () => import('./community/community.module').then(m => m.CommunityModule)
            },
            {
                path: 'citizen',component: CitizenComponent,
                canActivate: [AuthGuard],
                data: { Role: [RoleConst.Admin, RoleConst.User] },
                loadChildren: () => import('./citizen/citizen.module').then(m => m.CitizenModule)
            },
            {
                path: 'admin-bussiness',component: AdminBusinessComponent,
                canActivate: [AuthGuard],
                data: { Role: [RoleConst.Admin] },
                loadChildren: () => import('./admin-business/admin-business.module').then(m => m.AdminBusinessModule)
            },
            {
                path: 'seller',component: SellerComponent,
                canActivate: [AuthGuard],
                data: { Role: [RoleConst.Admin, RoleConst.User] },
                loadChildren: () => import('./seller/seller.module').then(m => m.SellerModule)
            },
            { 
                path: 'shop-register', component: ShopRegisterComponent,
                children:[
                  { path: 'shop-info', component: ShopInfoComponent },
                  { path: 'owner-info', component: OwnerInfoComponent },
                ]
            },
            {
                path: 'buyer',component: BuyerComponent,
                canActivate: [AuthGuard],
                data: { Role: [RoleConst.Admin, RoleConst.User] },
                loadChildren: () => import('./buyer/buyer.module').then(m => m.BuyerModule)
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }