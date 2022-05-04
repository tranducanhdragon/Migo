import { Injectable, InjectionToken, Injector } from '@angular/core';
import { 
    IItemViewDto, 
    ItemsDto, 
    ItemTypeDto, 
    ObjectPartnerDto, 
    OrderDto, 
    RateDto, 
    SetItemsDto } from 'src/model/bussiness/object-data';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseCommonService } from '../base-common.service';
import { BaseService } from '../base.service';
import { DataResponse } from 'src/model/dataresponse';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class BusinessService extends BaseCommonService {

  constructor(private injector:Injector) {
    super(injector);

   }

   public getAllOrdersSeller(param:any): Observable<any> {
    return this.http.get<DataResponse>(this.baseUrl + "/api/Business/GetOrderDataSeller", {params : param}).pipe(
        map((res: any) => {
            return res.result.data;
        }),
        catchError(err => {
            console.log("error ", err);
            return err;
        })
    );
   }

   public getAllOrdersBuyer(param:any): Observable<any> {
    return this.http.get<DataResponse>(this.baseUrl + "/api/Business/GetOrderDataBuyer", {params : param}).pipe(
        map((res: any) => {
            return res.result.data;
        }),
        catchError(err => {
            console.log("error ", err);
            return err;
        })
    );
   }

   public createOrUpdateObject(data: ObjectPartnerDto): Observable<any> {
    return this.http.post(this.baseUrl + "/api/Business/CreateOrUpdateObject", data).pipe(
        map((res: any) => {
            return res;
        }),
        catchError(err => {
            console.log("error ", err);
            return err;
        })
    );
   }

   public createOrUpdateRate(data: RateDto, url?: string): Observable<any> {
    return this.http.post(this.baseUrl + (url ? url :"/api/Business/CreateOrUpdateRate"), data).pipe(
        map((res: any) => {
            return res;
        }),
        catchError(err => {
            console.log("error ", err);
            return err;
        })
    );
   }

   public createOrUpdateItem(data: ItemsDto): Observable<any> {
    return this.http.post(this.baseUrl + "/api/Business/CreateOrUpdateItem", data).pipe(
        map((res: any) => {
            return res;
        }),
        catchError(err => {
            console.log("error ", err);
            return err;
        })
    );
   }

   public createOrUpdateItemType(data: ItemTypeDto): Observable<any> {
    return this.http.post(this.baseUrl + "/api/Business/CreateOrUpdateItemType", data).pipe(
        map((res: any) => {
            return res;
        }),
        catchError(err => {
            console.log("error ", err);
            return err;
        })
    );
   }

   public createOrUpdateItemView(data: IItemViewDto): Observable<any> {
    return this.http.post(this.baseUrl + "/api/Business/CreateOrUpdateItemView", data).pipe(
        map((res: any) => {
            return res;
        }),
        catchError(err => {
            console.log("error ", err);
            return err;
        })
    );
   }

   public createOrUpdateOrder(data: OrderDto): Observable<any> {
    return this.http.post(this.baseUrl + "/api/Business/CreateOrUpdateOrder", data).pipe(
        map((res: any) => {
            return res;
        }),
        catchError(err => {
            console.log("error ", err);
            return err;
        })
    );
   }

   public createOrderMany(data: OrderDto[]): Observable<any> {
    return this.http.post(this.baseUrl + "/api/Business/CreateOrderMany", data).pipe(
        map((res: any) => {
            return res;
        }),
        catchError(err => {
            console.log("error ", err);
            return err;
        })
    );
   }

   public createOrUpdateSetItems(data: SetItemsDto): Observable<any> {
    return this.http.post(this.baseUrl + "/api/Business/CreateOrUpdateSetItems", data).pipe(
        map((res: any) => {
            return res;
        }),
        catchError(err => {
            console.log("error ", err);
            return err;
        })
    );
   }

}
