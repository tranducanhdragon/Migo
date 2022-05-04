import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderDto } from 'src/model/bussiness/object-data';
import { BusinessService } from 'src/service/bussiness/business.service';
import { AppComponentBase } from 'src/shared/app-component-base';
import { BusinessType, Order_State } from 'src/environments/AppEnums';
import { DataShopService } from 'src/shared/observable-service/business/data.shop.service';

@Component({
  selector: 'app-goods-order-table',
  templateUrl: './goods-order-table.component.html',
  styleUrls: ['./goods-order-table.component.scss']
})
export class GoodsOrderTableComponent extends AppComponentBase implements OnInit {

  @Input() itemOrders: Observable<OrderDto[]> = new Observable
  @Input() ordersState: number = 0

  @Output() refreshData = new EventEmitter()

  shopData: any
  selectedOrder: any[] = []
  submitted!: boolean
  dishDialog!: boolean
  subscription: Subscription = new Subscription

  constructor(
    private injector: Injector,
    private router: Router,
    private businessService:BusinessService,
    private dataShopService: DataShopService,
  ) {
    super(injector);
    this.dataShopService.curentDataShop.subscribe((x) => (this.shopData = x))
  }

  ngOnInit(): void {
    this.itemOrders.subscribe(x =>{
      console.log('itemOrder Goods', x);
      
    })    
  }


  hideDialog() {
    this.dishDialog = false
    this.submitted = false
  }

  findIndexById(id: number) { }

  createId(): number {
    return Math.floor(Math.random() * 100) + 4
  }

  confirmOrder(order: OrderDto) {
    if (order.state == Order_State.Pending) {
      order.state = Order_State.Approved;
    }
    else if (order.state == Order_State.Approved) {
      order.state = Order_State.Completed;
    }
    
    order.properties = JSON.stringify(order.properties);
    this.businessService.createOrUpdateOrder(order).subscribe((res:any) => {
      if (res.result.success) {
        this.messageP.add({
          severity: 'success',
          summary: '',
          detail: 'Cập nhật thành công !',
          life: 4000,
        });
        // let prs = new HttpParams().append('type', BusinessType.CommerceGoods)
        // .append('state', this.ordersState);
        // this.itemOrders = this.getOrders(prs);
        this.refreshData.emit('')
      } else {
        this.messageP.add({
          severity: 'error',
          summary: '',
          detail: 'Hệ thống có lỗi !',
          life: 4000,
        })
      }
    })

  }
  cancelOrder(order:OrderDto){
    order.state = Order_State.Refused;
    order.properties = JSON.stringify(order.properties);
    this.businessService.createOrUpdateOrder(order).subscribe((res:any) => {
      if (res.result.success) {
        this.messageP.add({
          severity: 'success',
          summary: '',
          detail: 'Cập nhật thành công !',
          life: 4000,
        });
        // let prs = new HttpParams().append('type', BusinessType.CommerceGoods)
        // .append('state', this.ordersState);
        // this.itemOrders = this.getOrders(prs);
        this.refreshData.emit('')
      } else {
        this.messageP.add({
          severity: 'error',
          summary: '',
          detail: 'Hệ thống có lỗi !',
          life: 4000,
        })
      }
    })
  }
  getOrders(params: any) : any {
    return this.businessService.getAllOrdersSeller(params).pipe(map(
      (res:any) => {
        console.log("res", res);
        //trong res có nhiều x
        res.map((x:any) => {
          if(x){
            x.properties = JSON.parse(x.properties);          
            return x;
          }
        })
        return res;
     })
    )
  };
}
