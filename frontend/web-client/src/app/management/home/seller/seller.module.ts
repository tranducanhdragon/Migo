import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button'
import { FileUploadModule } from 'primeng/fileupload'
import { CardModule } from 'primeng/card'
import { ShopRegisterComponent } from './shop-register/shop-register.component';
import { ShopInfoComponent } from './shop-register/shop-info/shop-info.component';
import { OwnerInfoComponent } from './shop-register/owner-info/owner-info.component';
import { BusinessService } from 'src/service/bussiness/business.service';
import { DataShopService } from 'src/shared/observable-service/business/data.shop.service';
import { AllTypesProductService } from 'src/shared/observable-service/business/all-types-product.service';
import { InfoShopService } from 'src/shared/observable-service/business/info.shop.service';
import { MessagesModule } from 'primeng/messages';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { BadgeModule } from 'primeng/badge';
import { DropdownModule } from 'primeng/dropdown';
import { ImageModule } from 'primeng/image'
import { RatingModule } from 'primeng/rating'
import { ScrollPanelModule } from 'primeng/scrollpanel'
import {RadioButtonModule} from 'primeng/radiobutton';

import { GoodsManagementComponent } from './goods-management/goods-management.component';
import { ProductManagementComponent } from './goods-management/product-management/product-management.component';
import { ListProductComponent } from './goods-management/product-management/list-product/list-product.component';
import { RatingShopComponent } from './goods-management/rating-shop/rating-shop.component';
import { TableReviewComponent } from './goods-management/rating-shop/table-review/table-review.component';
import { ShopDetailComponent } from './goods-management/shop-detail/shop-detail.component';
import { ProductGoodsService } from 'src/shared/observable-service/business/product-goods.service';
import { AddProductComponent } from './add-product/add-product.component';
import { DataViewModule } from 'primeng/dataview';
import { ProductService } from 'src/service/bussiness/productservice';
import { ProductTypeService } from 'src/service/bussiness/product-type';
import { GoodsOrderComponent } from './goods-management/goods-order/goods-order.component';
import { GoodsOrderTableComponent } from './goods-management/goods-order/goods-order-table/goods-order-table.component';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  declarations: [
    SellerComponent,
    ShopRegisterComponent,
    ShopInfoComponent,
    OwnerInfoComponent,

    GoodsManagementComponent,
    ProductManagementComponent,
    ListProductComponent,
    AddProductComponent,
    RatingShopComponent,
    TableReviewComponent,
    ShopDetailComponent,
    GoodsOrderComponent,
    GoodsOrderTableComponent,

  ],
  imports: [
    CommonModule,
    SellerRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    FileUploadModule,
    CardModule,
    MessagesModule,
    InputTextModule,
    DividerModule,
    CalendarModule,
    InputNumberModule,
    PanelModule,
    TabViewModule,
    TableModule,
    ToastModule,
    DialogModule,
    SelectButtonModule,
    BadgeModule,
    DropdownModule,
    ImageModule,
    RatingModule,
    ScrollPanelModule,
    RadioButtonModule,
    TableModule,
    InputTextModule,
    DataViewModule,
    ButtonModule,
    RatingModule,

    //common module
    SharedModule,
  ],
  providers: [
    BusinessService,
    DataShopService,
    AllTypesProductService,
    InfoShopService,
    ProductGoodsService,
    ProductTypeService
  ],
})
export class SellerModule { }
