import { Component, Injector, InjectorType, OnInit } from '@angular/core';
import { OrderDto } from 'src/model/bussiness/object-data';
import { BusinessService } from 'src/service/bussiness/business.service';
import { AppComponentBase } from 'src/shared/app-component-base';
import { Order_State } from 'src/environments/AppEnums';
import { GoodsCartService } from 'src/shared/observable-service/business/goods-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent extends AppComponentBase implements OnInit {

  lstGoodsCart:OrderDto[]=[]

  constructor(
    private injector:Injector,
    private goodsCart:GoodsCartService,
    private businessService:BusinessService) {
      super(injector)
    }
  
  ngOnInit() {
    this.goodsCart.curentGoodsCart.subscribe((x:any) => {
      if(x && x.length > 0){
        x.map((el:any) => {
          if(typeof(el.properties) == 'string'){
            el.properties = JSON.parse(el.properties)
          }
        });
      }
      console.log('lstGoodsCart', this.lstGoodsCart);  
      this.lstGoodsCart = x
    })
  }

  isCartDialog:boolean=false
  showCartDialog(){
    this.isCartDialog = !this.isCartDialog
  }
  removeItemCart(item:any){

  }
  removeAllItemCart(){
    this.goodsCart.removeAll()
  }
  submitPayment(){
    let lstItemCartInput:OrderDto[] = []
    this.lstGoodsCart.forEach((x:any) => {
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
        this.isCartDialog = false
        this.lstGoodsCart = []
        this.goodsCart.removeAll()
      } else {
        this.messageP.add({
          severity: 'error',
          summary: '',
          detail: 'Hệ thống có lỗi !',
          life: 3000,
        })
        this.isCartDialog = false
      }
    })
  }
}
