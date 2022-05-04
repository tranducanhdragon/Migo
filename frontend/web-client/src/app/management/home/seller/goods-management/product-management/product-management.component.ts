import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemsDto } from 'src/model/bussiness/object-data';
import { BusinessService } from 'src/service/bussiness/business.service';
import { BusinessType, FormCase, Item_FormId } from 'src/environments/AppEnums';
import { DataShopService } from 'src/shared/observable-service/business/data.shop.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {
 
  allProducts : Observable<ItemsDto[]> = new Observable();
  newProducts : Observable<ItemsDto[]> = new Observable();
  disableProducts : Observable<ItemsDto[]> = new Observable();
  refuseProducts : Observable<ItemsDto[]> = new Observable();
  activeProducts : Observable<ItemsDto[]> = new Observable();
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

  // getDataShop() {
  //   let params = new HttpParams().append('type', 2).append('formCase', 2).append('formId', 23);
  //   const url = "/api/services/app/BusinessObject/GetObjectData";
  //   this.businessService.getAllData(url, params).subscribe(res => {
    
  //     if(res.result.data.properties) {
  //       res.result.data.properties = JSON.parse( res.result.data.properties);
  //       this.shopData = res.result.data;
       
  //     }
  //   });

  // }

  getData() {
    let params1 = new HttpParams().append('type', BusinessType.CommerceGoods)
    .append('formCase', FormCase.Get_All)
    .append('formId', Item_FormId.Partner_GetAll_Item)
    .append('storeObjectId', this.shopData.storeObjectId);

    let params2 = new HttpParams().append('type', BusinessType.CommerceGoods)
    .append('formCase', FormCase.Get_All)
    .append('formId', Item_FormId.Partner_GetAll_Item_ACTIVE)
    .append('storeObjectId', this.shopData.storeObjectId);

    let params3 = new HttpParams().append('type', BusinessType.CommerceGoods)
    .append('formCase', FormCase.Get_All)
    .append('formId', Item_FormId.Partner_GetAll_Item_Disable)
    .append('storeObjectId', this.shopData.storeObjectId);
    
    let params4 = new HttpParams().append('type', BusinessType.CommerceGoods)
    .append('formCase', FormCase.Get_All)
    .append('formId', Item_FormId.Partner_GetAll_Item_NEW)
    .append('storeObjectId', this.shopData.storeObjectId);

    let params5 = new HttpParams().append('type', BusinessType.CommerceGoods)
    .append('formCase', FormCase.Get_All)
    .append('formId', Item_FormId.Partner_GetAll_Item_Refuse)
    .append('storeObjectId', this.shopData.storeObjectId);
    
    this.allProducts = this.getProducts(params1);
    this.activeProducts = this.getProducts(params2);
    this.disableProducts = this.getProducts(params3);
    this.newProducts = this.getProducts(params4);
    this.refuseProducts = this.getProducts(params5);
  }

  getProducts(params: any) : any {
    const url = "/api/Business/GetItemData";
    return  this.businessService.getAllDataAsync(url, params).pipe(map(
      res => {
       res.map((x:any) =>{
          x.properties = JSON.parse(x.properties);
          return x;
        });
        console.log('items', res);
        
        return res;
      }
    ));
  };

}
