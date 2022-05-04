import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BusinessService } from '../../../service/bussiness/business.service';

@Injectable()
export class DataShopService {

  
  private dataShop = new BehaviorSubject(JSON.parse(localStorage.getItem('dataShopGoods')??"{}"));
  curentDataShop = this.dataShop.asObservable();
 

  constructor(
   // private businessService: BusinessService
  ) { 
    
  }

  changeShop(data: any) {
    this.dataShop.next(data);
    localStorage.removeItem('dataShopGoods');
    localStorage.setItem('dataShopGoods', JSON.stringify(data));
  }

 

}