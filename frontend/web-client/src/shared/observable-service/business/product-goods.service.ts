import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ProductGoodsService {

  
  private productGoods = new BehaviorSubject(JSON.parse(localStorage.getItem('productGoods')??"{}"));
  curentproductGoods = this.productGoods.asObservable();

  private updateState = new BehaviorSubject(false);
  currentState = this.updateState.asObservable();
 

  constructor(
   // private businessService: BusinessService
  ) { 
    
  }

  changeProductGoods(data: any) {
    this.productGoods.next(data);
    localStorage.removeItem('productGoods');
    localStorage.setItem('productGoods', JSON.stringify(data));
  }

  changUpdateState(data: any) {
    this.updateState.next(data);
  }

}