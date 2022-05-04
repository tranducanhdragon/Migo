import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderDto } from 'src/model/bussiness/object-data';
import { BusinessService } from 'src/service/bussiness/business.service';
import { BusinessType, Order_State } from 'src/environments/AppEnums';
import { DataShopService } from 'src/shared/observable-service/business/data.shop.service';

@Component({
  selector: 'app-goods-order',
  templateUrl: './goods-order.component.html',
  styleUrls: ['./goods-order.component.scss']
})
export class GoodsOrderComponent implements OnInit {

  pendingOrders : Observable<OrderDto[]> = new Observable;
  approvedOrders : Observable<OrderDto[]> = new Observable;
  completedOrders : Observable<OrderDto[]> = new Observable;
  refusedOrders : Observable<OrderDto[]> = new Observable;
  shopData: any;
  constructor(
    private businessService: BusinessService,
    private dataShopService: DataShopService
  ) { 
   
  }

  ngOnInit() {
    this.dataShopService.curentDataShop.subscribe( x => {
      this.shopData = x;
      if(x.properties){
        this.getData();
      }
    });
      
  }

  getData() {
    let paramsPending = new HttpParams().append('storeObjectId', this.shopData.storeObjectId)
    .append('state', Order_State.Pending);
    let paramsApproved = new HttpParams().append('storeObjectId', this.shopData.storeObjectId)
    .append('state', Order_State.Approved);
    let paramsCompleted = new HttpParams().append('storeObjectId', this.shopData.storeObjectId)
    .append('state', Order_State.Completed);
    let paramsRefused = new HttpParams().append('storeObjectid', this.shopData.storeObjectId)
    .append('state', Order_State.Refused);

    this.pendingOrders = this.getOrders(paramsPending);
    this.approvedOrders = this.getOrders(paramsApproved);
    this.completedOrders = this.getOrders(paramsCompleted);
    this.refusedOrders = this.getOrders(paramsRefused);
  }

  getOrders(params: any) : any {
    return this.businessService.getAllOrdersSeller(params).pipe(map(
      res => {
        console.log("res", res);
        //trong res có nhiều x
        if(res){
          res.map((x:any) => {
            if(x){
              x.properties = JSON.parse(x.properties);          
              return x;
            }
          })
        }
        return res;
     })
    )
  };
}
