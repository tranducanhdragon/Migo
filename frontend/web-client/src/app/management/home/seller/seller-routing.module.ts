import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleConst } from 'src/environments/constant';
import { AddProductComponent } from './add-product/add-product.component';
import { GoodsManagementComponent } from './goods-management/goods-management.component';
import { RatingShopComponent } from './goods-management/rating-shop/rating-shop.component';
import { SellerComponent } from './seller.component';


@NgModule({
  imports: [
      RouterModule.forChild([
        {
          path: '',component: SellerComponent,
          children: [
            { path: '', component: GoodsManagementComponent,},
            { path: 'goods-management', component: GoodsManagementComponent,},
            { path: 'rate-shop', component : RatingShopComponent,},
            { path: 'add-product', component: AddProductComponent},
          ]
        },
      ])
  ],  
  exports: [RouterModule]
})
export class SellerRoutingModule { }