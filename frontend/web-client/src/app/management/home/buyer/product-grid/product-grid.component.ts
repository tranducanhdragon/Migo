import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  AUTO_STYLE,
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { ItemsDto, OrderDto } from 'src/model/bussiness/object-data';
import { AllTypesProductService } from 'src/shared/observable-service/business/all-types-product.service';
import { BusinessService } from 'src/service/bussiness/business.service';
import { BusinessType, FormCase, Item_FormId, Order_State, State_Object } from 'src/environments/AppEnums';
import { ProductGoodsService } from 'src/shared/observable-service/business/product-goods.service';
import { DataGoodsService } from 'src/shared/observable-service/business/data.goods.service';
import { PrimeNGConfig } from 'primeng/api';
import { ProductService } from '../../../../../service/bussiness/productservice';
import { GoodsCartService } from 'src/shared/observable-service/business/goods-cart.service';
import { UserTokenService } from 'src/shared/observable-service/user/user-token.service';

export interface SelectItem<T = any> {
  label?: string;
  value: T;
  styleClass?: string;
  icon?: string;
  title?: string;
  disabled?: boolean;
}

export interface Product {
  id?:string;
  code?:string;
  name?:string;
  description?:string;
  price?:number;
  quantity?:number;
  inventoryStatus?:string;
  category?:string;
  image?:string;
  rating?:number;
}

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css', './product-grid.component.scss'],
  animations: [
    trigger('collapse', [
      state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ height: '0', visibility: 'hidden' })),
      transition('false => true', animate(1000 + 'ms ease-in')),
      transition('true => false', animate(1000 + 'ms ease-out'))
    ])
  ]
})
export class ProductGridComponent implements OnInit {

  userId:number=0
  storeId:number=0
  allProducts : Observable<ItemsDto[]> = new Observable;
  countProduct: number = 0;
  typeProduct: any;
  totalRecords : Observable<number> = of(0);

  relatedSearchType:any[]=[];

  order:OrderDto=new OrderDto()

  selectedCountries1: any;

  responsiveOptions:any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
  ];

  @ViewChild ('dt') dataTable: Table | any; 

  constructor(
    private businessService: BusinessService,
    private router: Router,
    private productDataService: DataGoodsService,
    private route: ActivatedRoute,
    private productService: ProductService, 
    private goodsCart:GoodsCartService,
    private userTokenService:UserTokenService,
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit() {
    //get userId
    this.userId = this.userTokenService.getUserToken()

    //get products tĩnh
    // this.productService.getProducts().then((data:any) => this.products = data);

    this.storeId = this.route.snapshot.params['storeObjectId']
    console.log('storeId', this.storeId);
    

    //get products từ db
    this.getData()

    this.sortOptions = [
        {label: 'Price High to Low', value: '!price'},
        {label: 'Price Low to High', value: 'price'}
    ];

    this.primengConfig.ripple = true;

    //set all product to totalRecords
    this.allProducts.subscribe(x => {
      if(x && x != null){
        //chưa trả về tổng số bản ghi nên lấy tạm 100       
        this.totalRecords = of(100);
      }
    })
  }
  products: Product[] = [];
  sortOptions: SelectItem[] = [];
  sortOrder: number = 0;
  sortField: string = "";
    
  onSortChange(event:any) {
      let value = event.value;

      if (value.indexOf('!') === 0) {
          this.sortOrder = -1;
          this.sortField = value.substring(1, value.length);
      }
      else {
          this.sortOrder = 1;
          this.sortField = value;
      }
  }
  isDetailProduct:boolean=false
  detailProduct:any
  openDetailProduct(product: any) {
    this.productDataService.changeShop(product);
    this.detailProduct = product
    this.isDetailProduct = true
  }
  closeModal(){
    this.isDetailProduct = false
  }

  displayZoom: boolean=false;
  activeIndex: number = 0;
  scroll($element:any) {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
  imageClick(index: number) {
    console.log('index',index);
    this.activeIndex = index ? index: 0;
    this.displayZoom = true;
  }

  getData() {
    let params1 = new HttpParams().append('type', BusinessType.CommerceGoods)
    .append('formCase', FormCase.Get_All)
    .append('formId', Item_FormId.Partner_GetAll_Item_ACTIVE)
    .append('storeObjectId', this.storeId)
    .append('maxResultCount', 12)
   
    this.allProducts = this.getProducts(params1);
  }

  getProducts(params: any) : any {
    const url = "/api/Business/GetItemData";
    return  this.businessService.getAllDataAsync(url, params).pipe(map(
      res => {
       res.map((x:any) =>{
          x.properties = JSON.parse(x.properties);
          return x;
        });
        console.log('products', res);
        return res;
      }
    ));
  };
  getRandomRelatedType(data:any){
    if(data){
      let randomLen = Math.floor(Math.random() * 10)
      for(let i = 0; i < randomLen; ){
        const randomIndex = Math.floor(Math.random() * data.length);
        this.relatedSearchType.push(data[randomIndex]);
        i++;
     };
    }
  }

  keyword:string=''
  searchProducts(){
    let prs = new HttpParams()
    .append('keyword', this.keyword)  
    .append('type', BusinessType.CommerceGoods)
    .append('formCase', FormCase.Get_All)
    .append('formId', Item_FormId.Partner_GetAll_Item_ACTIVE)
    .append('storeObjectId', this.storeId)
    .append('maxResultCount', 12)
   
    this.allProducts = this.getProducts(prs);
  }

  addToCart(product:any){
    this.order.storeObjectId = product.storeObjectId
    this.order.ordererId = this.userId
    this.order.storeItemId = product.storeItemId
    this.order.state = Order_State.Pending
    this.order.orderDate = new Date()
    this.order.properties = JSON.stringify(product.properties)
    this.goodsCart.addGood(this.order)
    this.isDetailProduct = false
  }

  collapsed0 = false;
  toggleNode0() {
    this.collapsed0 = !this.collapsed0;
  }

  collapsed1 = false;
  toggleNode1() {
    this.collapsed1 = !this.collapsed1;
  }

  collapsed2:boolean[] = [false];
  toggleNode2(i:number) {
    this.collapsed2[i] = !this.collapsed2[i];
  }

  collapsed3:boolean[] = [false];
  toggleNode3(i:number) {
    this.collapsed3[i] = !this.collapsed3[i];
  }
}