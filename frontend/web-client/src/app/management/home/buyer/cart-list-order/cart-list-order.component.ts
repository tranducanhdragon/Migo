import { HttpParams } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { OrderDto } from 'src/model/bussiness/object-data';
import { BusinessService } from 'src/service/bussiness/business.service';
import { AppComponentBase } from 'src/shared/app-component-base';
import { Order_State } from 'src/environments/AppEnums';
import { GoodsCartService } from 'src/shared/observable-service/business/goods-cart.service';
import { UserTokenService } from 'src/shared/observable-service/user/user-token.service';

@Component({
  selector: 'app-cart-list-order',
  templateUrl: './cart-list-order.component.html',
  styleUrls: ['./cart-list-order.component.scss']
})
export class CartListOrderComponent extends AppComponentBase implements OnInit {

  lstOrders:OrderDto[]=[]
  userId:number=0

  constructor(
    private injector:Injector,
    private goodsCart:GoodsCartService,
    private businessService:BusinessService,
    private userTokenService:UserTokenService) {
      super(injector)
    }
  
  ngOnInit() {
    // this.goodsCart.curentGoodsCart.subscribe((x:any) => {
    //   if(x && x.length > 0){
    //     x.map((el:any) => {
    //       if(typeof(el.properties) == 'string'){
    //         el.properties = JSON.parse(el.properties)
    //       }
    //     });
    //   }
    //   this.lstGoodsCart = x
    //   console.log('lstGoodsCart', this.lstGoodsCart);  
    // })    
    this.userId = this.userTokenService.getUserToken()
    this.getData()
  }

  isCartLstOrder:boolean=false
  showCartLstOrder(){
    this.isCartLstOrder = !this.isCartLstOrder
  }
  getData(){
    let prs = new HttpParams().append('ordererId', this.userId)
    this.getOrders(prs);
    
  }
  getOrders(params:any) : any {
    this.businessService.getAllOrdersBuyer(params).subscribe(res => {
      //trong res có nhiều x
      if(res){
        res.map((x:any) => {
          if(x){
            x.properties = JSON.parse(x.properties);          
            return x;
          }
        })
        console.log("lstOrders", res);
        this.lstOrders = res
      }
    })
  };
  removeItemInCart(item:any){

  }
  removeAllItemCart(){
    this.goodsCart.removeAll()
  }
  submitPayment(){
    let lstItemCartInput:OrderDto[] = []
    this.lstOrders.forEach((x:any) => {
      let order:OrderDto = {...x}
      order.properties = JSON.stringify(order.properties)
      order.state = Order_State.Pending
      lstItemCartInput.push(order)
    })

    this.businessService.createOrderMany(lstItemCartInput).subscribe((res:any) => {
      if (res.result.success) {
        this.messageP.add({
          severity: 'success',
          summary: '',
          detail: 'Order thành công !',
          life: 3000,
        })
        this.isCartLstOrder = false
        this.lstOrders = []
        this.goodsCart.removeAll()
      } else {
        this.messageP.add({
          severity: 'error',
          summary: '',
          detail: 'Hệ thống có lỗi !',
          life: 3000,
        })
        this.isCartLstOrder = false
      }
    })
  }
}
