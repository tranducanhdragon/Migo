import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GoodsCartService {

  
  private goodsCart = new BehaviorSubject(JSON.parse(localStorage.getItem('goodsCart')??'{}'));
  curentGoodsCart = this.goodsCart.asObservable();
 
  constructor(
   
  ) { 

  }
  removeItemCart(item:any){
    
  }

  removeAll(){
    this.goodsCart.next([])
    localStorage.removeItem('goodsCart')
    localStorage.setItem('goodsCart', JSON.stringify({}))
  }

  addGood(data: any) {
    let newData
    if(this.goodsCart.value.length > 0){
      newData = [...this.goodsCart.value, {...data}]
    }
    else{
      newData = [{...data}]
    }
    this.goodsCart.next(newData)
    localStorage.removeItem('goodsCart')
    localStorage.setItem('goodsCart', JSON.stringify(newData))
  }
}