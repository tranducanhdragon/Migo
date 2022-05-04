import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AllTypesProductService {

  
  private allTypesProduct = new BehaviorSubject(JSON.parse(localStorage.getItem('allTypesProduct')??"{}"));
  current = this.allTypesProduct.asObservable();


  constructor() {
     
   }

  getData() {
    this.current = new BehaviorSubject(JSON.parse(localStorage.getItem('allTypesProduct')??"{}")).asObservable();
  }

  change(data: any) {
    this.allTypesProduct.next(data);
    localStorage.removeItem('allTypesProduct');
    localStorage.setItem('allTypesProduct', JSON.stringify(data));
  }



}