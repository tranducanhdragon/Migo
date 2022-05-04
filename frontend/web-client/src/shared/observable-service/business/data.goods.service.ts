import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataGoodsService {
  private dataProduct = new BehaviorSubject(JSON.parse(localStorage.getItem('dataProductGoods')??'{}'));
  curentDataProduct = this.dataProduct.asObservable();
 
  constructor(
   
  ){ 
    
  }

  changeShop(data: any) {
    this.dataProduct.next(data);
    localStorage.removeItem('dataProductGoods');
    localStorage.setItem('dataProductGoods', JSON.stringify(data));
  }

}