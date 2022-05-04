import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { Panel } from 'primeng/panel';
import { Subscription } from 'rxjs';
import { BusinessService } from 'src/service/bussiness/business.service';
import { DataShopService } from 'src/shared/observable-service/business/data.shop.service';

@Component({
  selector: 'app-goods-management',
  templateUrl: './goods-management.component.html',
  styleUrls: ['./goods-management.component.scss']
})
export class GoodsManagementComponent implements OnInit {

  @ViewChild('panelEdit') panel?: Panel
  shopData:any;
  subscription:Subscription= new Subscription();
  msgs2: Message[] = [];
  coll = true;
  constructor(
    private businessService: BusinessService,
    private dataShopService: DataShopService
  ) { }

  ngOnInit(): void {
    let mes:any = null;
    this.dataShopService.curentDataShop.subscribe(x => {
      this.shopData = x;
      if(this.shopData) {
        if(this.shopData.state === 2) {
          mes =  {severity:'success', summary:'Success', detail:'Cửa hàng được duyệt thành công !'};
        } else
        if(this.shopData.state === 3) {
          mes =  {severity:'warn', summary:'Warning', detail:'Cửa hàng cần sửa lại thông tin !'};
        }
        if(this.shopData.state === 4) {
          mes =  {severity:'error', summary:'Error', detail:'Cửa hàng bị từ chối !'};
        }
      }
      this.addMessages(mes);
    });  
  }

  toggle(event:any) {
    console.log('toggle', event);
  }

  addMessages(mes: any) {
    this.msgs2.push(mes);
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getDataShop() {
   
  }

  scroll(el: HTMLElement) {
    this.coll = false;
    el.scrollIntoView({
      behavior: 'smooth',

    });
  }
  
}

