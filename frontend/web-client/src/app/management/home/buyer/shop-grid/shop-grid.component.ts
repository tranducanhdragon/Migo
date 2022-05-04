import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemsDto } from 'src/model/bussiness/object-data';
import { BusinessService } from 'src/service/bussiness/business.service';
import { BusinessType, FormCase, Item_FormId, State_Object } from 'src/environments/AppEnums';
import { AllTypesProductService } from 'src/shared/observable-service/business/all-types-product.service';

@Component({
  selector: 'app-shop-grid',
  templateUrl: './shop-grid.component.html',
  styleUrls: ['./shop-grid.component.css']
})
export class ShopGridComponent implements OnInit {
  allShops: Observable<any[]> = new Observable()
  allProducts : Observable<ItemsDto[]> = new Observable();
  
	responsiveOptions:any;
  itemListTypes: any;
  isQuickView: boolean = false;

  quickLookProduct:any
  
  constructor(
    private router: Router,
    private allTypesProductService:AllTypesProductService,
    private businessService: BusinessService) {

    }

  ngOnInit() {
   this.initData();
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
    ];
  }


  initData() {
    // this.getAllTypeProduct();
    // this.getData();
    this.getAllShop();
    console.log('cookies', this.getCookies("pageSession"));
    
  }
  getAllShop(){
    let params1 = new HttpParams().append('formCase', FormCase.Get_All)
    .append('state', State_Object.Active)
    .append('formId', Item_FormId.User_Item_Getall)
    .append('totalCount', 20);
   
    this.allShops = this.getShops(params1);
  }

  getAllTypeProduct() {
    this.itemListTypes = this.allTypesProductService.current;

    this.itemListTypes.subscribe((x:any) => {
      console.log('itemListTypes', x);
    })
  }

  getData() {
    let params1 = new HttpParams().append('type', BusinessType.CommerceGoods)
    .append('formCase', FormCase.Get_All)
    .append('formId', Item_FormId.User_Item_Getall)
    .append('totalCount', 20)
    .append('pageSession', this.getCookies("pageSession"))
    .append('timelife', this.getCookies("timelife"));
   
    // this.allProducts = this.getProducts(params1);
 
    
  }

  showShopDetail(product: any) {
    // this.productDataService.changeShop(product);
    this.router.navigate(['home/buyer/product-grid', {storeObjectId: product.storeObjectId}]);
  }

  keyword:string=''
  searchShops(){
    let prs = new HttpParams()
    .append('keyword', this.keyword)
    .append('formCase', FormCase.Get_All)
    .append('state', State_Object.Active)
    .append('formId', Item_FormId.User_Item_Getall)
    .append('totalCount', 20);
   
    this.allShops = this.getShops(prs);
  }

  getProducts(params: any) : any {
    const url = "/api/Business/GetItemData";
    return  this.businessService.getAllDataAsync(url, params).pipe(map(
      res => {
       res.map((x:any) =>{
          x.properties = JSON.parse(x.properties);
          return x;
        });
        return res;
      }
    ));
  };

  getShops(params: any) : any {
    const url = '/api/Business/GetObjectData'
    return this.businessService.getAllDataAsync(url, params).pipe(
      map((val:any) => {        
        return val.map((x:any) => {
          x.properties = JSON.parse(x.properties)
          return x
        })
      }),
    )
  };

  getDataCategory(type:any) {
    // this.router.navigate(['app/smart-community/shopping/product-grid',StateTypeProduct.Category]);
    // this.typeProductService.changeType(type);
  }

  panelId:number=0;
  getProductsByCategory(cate?:any){

    if(!cate){
      this.panelId = 0;
      this.getData();
    }
    else{
      this.panelId = cate;
      let prs = new HttpParams().append('typeGoods', cate)
      .append('type', BusinessType.CommerceGoods)
      .append('formCase', FormCase.Get_All)
      .append('formId', Item_FormId.User_Item_Getall)
      .append('totalCount', 20)
      this.allProducts = this.getProducts(prs);
    }
  }

  changPages(event:any) {
    //console.log('changPages', event);
    let prm = new HttpParams().append('type', BusinessType.CommerceGoods)
    .append('formCase', FormCase.Get_All)
    .append('formId', Item_FormId.User_Item_Getall)
    .append('skipCount', event.first)
    .append('maxResultCount', 12);

    this.allProducts = this.getProducts(prm);
  }

  getCookies(name: string): string {
    return ""
    // const nameLenPlus = (name.length + 1);
    // return document.cookie
		// .split(';')
		// .map(c => c.trim())
		// .filter(cookie => {
		// 	return cookie.substring(0, nameLenPlus) === `${name}=`;
		// })
		// .map(cookie => {
		// 	return decodeURIComponent(cookie.substring(nameLenPlus));
		// })[0] || null;
  }

  showQuickLook(product:any) {
    this.isQuickView = true;
    this.quickLookProduct = product;
    console.log('modalpro', product);
  }
  
  closeModal() {
    this.isQuickView = false;
  }
  addToCart(){

  }
  giveLike(){
    
  }
}
