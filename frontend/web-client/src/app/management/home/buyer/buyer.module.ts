import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerRoutingModule } from './buyer-routing.module';
import { BuyerComponent } from './buyer.component';
import {PaginatorModule} from 'primeng/paginator';
import { BusinessService } from 'src/service/bussiness/business.service';
import { DataShopService } from 'src/shared/observable-service/business/data.shop.service';
import { AllTypesProductService } from 'src/shared/observable-service/business/all-types-product.service';
import { InfoShopService } from 'src/shared/observable-service/business/info.shop.service';
import { ProductGoodsService } from 'src/shared/observable-service/business/product-goods.service';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import {DataViewModule} from 'primeng/dataview';
import {ButtonModule} from 'primeng/button';
import {RatingModule} from 'primeng/rating';
import {MultiSelectModule} from 'primeng/multiselect';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductGridComponent } from './product-grid/product-grid.component';
import { ShopGridComponent } from './shop-grid/shop-grid.component';
import { DataGoodsService } from 'src/shared/observable-service/business/data.goods.service';
import { ProductService } from 'src/service/bussiness/productservice';
import { SharedModule } from 'src/shared/shared.module';
import { CartComponent } from './cart/cart.component';
import { GoodsCartService } from 'src/shared/observable-service/business/goods-cart.service';
import { ToastModule } from 'primeng/toast';
import { GalleriaModule } from 'primeng/galleria';
import { CartListOrderComponent } from './cart-list-order/cart-list-order.component';
import { BadgeModule } from 'primeng/badge';

@NgModule({
  imports: [
    CommonModule,
    BuyerRoutingModule,

    //primeng
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule,
    TableModule,
    InputTextModule,
    DataViewModule,
    ButtonModule,
    RatingModule,
    MultiSelectModule,
    ToastModule,
    GalleriaModule,
    BadgeModule,
    //common
    SharedModule
  ],
  declarations: [
    BuyerComponent,
    ProductGridComponent,
    ShopGridComponent,
    CartComponent,
    CartListOrderComponent,
  ],
  providers:[
    BusinessService,
    DataShopService,
    AllTypesProductService,
    InfoShopService,
    ProductGoodsService,
    DataGoodsService,
    ProductService,
    GoodsCartService,
  ]
})
export class BuyerModule { }
