import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleConst } from 'src/environments/constant';
import { BuyerComponent } from './buyer.component';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { ShopGridComponent } from './shop-grid/shop-grid.component';

const routes: Routes = [
    {
      path: '',component: BuyerComponent,
      children: [
        { path: 'product-grid', component: ProductGridComponent },
        { path: 'shop-grid', component: ShopGridComponent },
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerRoutingModule { }