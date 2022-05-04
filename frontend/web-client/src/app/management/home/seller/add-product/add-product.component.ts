import { HttpParams } from '@angular/common/http'
import { FnParam } from '@angular/compiler/src/output/output_ast'
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { NgModel } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { PrimeNGConfig, SelectItem } from 'primeng/api'
import { Table } from 'primeng/table'

import { Observable, of, Subscription } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { ItemsDto, ItemViewDto } from 'src/model/bussiness/object-data'
import { BusinessService } from 'src/service/bussiness/business.service'
import { ProductTypeService } from 'src/service/bussiness/product-type'
import { ProductService } from 'src/service/bussiness/productservice'
import { BusinessType, State_Object } from 'src/environments/AppEnums'
import { AllTypesProductService } from 'src/shared/observable-service/business/all-types-product.service'
import { DataShopService } from 'src/shared/observable-service/business/data.shop.service'
import { ProductGoodsService } from 'src/shared/observable-service/business/product-goods.service'

export interface Product {
  name?: string
  descriptions?: string
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css', './add-product.component.scss'],
})
export class AddProductComponent implements OnInit, OnDestroy {
  shopData: any
  shopId: number = 0
  preInfo: boolean = false
  itemProperties: any
  product: any = {}

  infoDetail: any[] = [1, 2, 3, 4, 5, 6]
  status: boolean = false
  node_0: any
  node_1: any
  node_2: any
  selectType: any
  //image
  image_1: string = ''
  image_2: string = ''
  image_3: string = ''
  image_4: string = ''
  image_5: string = ''
  imgs = [
    {
        "name": "Ảnh bìa",
        "type": 1,
        "inputType": 8,
        "url": ""
    },
    {
        "name": "Hình ảnh 1",
        "type": 1,
        "inputType": 8,
        "url": ""
    },
    {
        "name": "Hình ảnh 2",
        "type": 1,
        "inputType": 8,
        "url": ""
    },
    {
        "name": "Hình ảnh 3",
        "type": 1,
        "inputType": 8,
        "url": ""
    },
    {
        "name": "Hình ảnh 4",
        "type": 1,
        "inputType": 8,
        "url": ""
    }
  ]

  //video
  video: any = {videoUrl:""}
  selectedCity1: any

  itemTypeView: ItemViewDto = {properties:"",type:0, init(){}}
  itemView: ItemViewDto = new ItemViewDto()
  subscription: Subscription = new Subscription()
  isUpdate: any

  keys: any[] = [
    { displayvalue: 'Đỏ', savevalue: 'Đỏ' },
    { displayvalue: 'Xanh', savevalue: 'Xanh' },
    { displayvalue: 'Vàng', savevalue: 'Vàng' },
  ]

  lstItemAttr:Array<ItemAttribute> = [{displayName:"" ,value:[{name:""}]}];

  isNext:boolean=false;
  isSubmit:boolean=false

  allProducts : Observable<ItemsDto[]> = new Observable;
  countProduct: number = 0;
  typeProduct: any;
  totalRecords : Observable<number> = of(0);

  relatedSearchType:any[]=[];

  @ViewChild ('dt') dataTable: Table | any; 

  productTypes: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private businessService: BusinessService,
    private router: Router,
    private dataShopService: DataShopService,
    private productTypeService: ProductTypeService, 
    private primengConfig: PrimeNGConfig
  ) {
    this.dataShopService.curentDataShop.subscribe((x) => (this.shopData = x))
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.isUpdate = this.route.snapshot.queryParamMap.get('update')
    
    // console.log('id', this.route.snapshot.queryParamMap.get('update'))

    //drop default data to itemView
    this.itemView.init(ResDefault)

    //get all type
    this.productTypeService.getProductTypes().then((data:any) => {
      this.productTypes = data
      console.log('productTypes', this.productTypes);
      
    });

    this.primengConfig.ripple = true;

    //set all product to totalRecords
    this.allProducts.subscribe(x => {
      if(x && x != null){
        //chưa trả về tổng số bản ghi nên lấy tạm 100       
        this.totalRecords = of(100);
      }
    })
  }

  validateCustom(context: any ): boolean {
    if ( !context.name || !this.node_0 || !this.node_1) {
      return false;
    }
    return true;
  }

  addItem(){
    this.lstItemAttr.push({displayName:"", value:[{name:""}]});
  }
  removeItem(item:any){
    this.lstItemAttr.pop();
  }
  addItemAttr(index:number){
    this.lstItemAttr[index].value?.push({name:""});
  }
  removeItemAttr(index:number, attribute:any){
    this.lstItemAttr[index].value?.pop();
  }
  deleteLocalFile(image:any) {
    image.url = ''
  }

  next(productType:any) {
    this.typeProduct = productType
    console.log('typeProduct', this.typeProduct);
    
    this.isNext = true
    this.preInfo = true
  }

  submitAddProduct(data:any) {
    this.isSubmit=true;
    console.log('du lieu', data)
    if(this.itemView.properties.infoBasic[2].value
      && this.itemView.properties.infoBasic[3].value){
        
        //lọc dữ liệu để cho vào db
        //add list property to Phân loại
        if(data.properties.infoSell){
          data.properties.infoSell[0].listProperties = this.lstItemAttr;
        }
    
        data.name = this.itemView.properties.infoBasic[2].value
        data.properties = JSON.stringify(data.properties)
        
        let item = new ItemsDto(data)
        item.type = BusinessType.CommerceGoods
        item.state = State_Object.New
        item.storeObjectId = this.shopData.storeObjectId
         
        if (this.selectType != undefined){
          item.queryKey = 'Goods.Product.' + this.selectType.data.id
        }
        item.init(item)
        console.log('item', item)
    
        //call api
        this.businessService.createOrUpdateItem(item).subscribe((res) => {
          if (res.result.success) {
            this.router.navigate(['/home/seller'])
          }
        })
    }
  }

  uploadImage(event:any, image:any) {
    if (event.target.files.length > 0) {
      const formData = new FormData()
      formData.append('file', event.target.files[0], event.target.files[0].name)
      this.businessService.uploadImagePublic(formData).subscribe((res) => {
        image.url = res
      })
    }
  }
  uploadVideo(event:any, video:any) {
    console.log('video', event)
    if (event.target.files.length > 0) {
      const formData = new FormData()
      formData.append('file', event.target.files[0], event.target.files[0].name)
      this.businessService.uploadImagePublic(formData).subscribe((res) => {
        video.url = res
      })
    }
  }

  onBasicUpload(e:any){
    
  }

  cancel() {
    this.router.navigate(['/home/seller'])
  }

  changeTypeProduct() {
    this.preInfo = false
  }
}
export class ItemAttribute{
  id?:number;
  displayName?:string;
  value?:AttributeValue[];
}
export class AttributeValue{
  id?:number;
  name?:string;
}

const ResDefault = {
  id: 0,
  type:2,
  properties: {
    "infoBasic": [
      {
        "name": "Hình ảnh sản phẩm",
        "type": "array",
        "data": [
          {
            "name": "Ảnh bìa",
            "type": 1,
            "inputType": 8,
            "url": ""
          },
          {
            "name": "Hình ảnh 1",
            "type": 1,
            "inputType": 8,
            "url": ""
          },
          {
            "name": "Hình ảnh 2",
            "type": 1,
            "inputType": 8,
            "url": ""
          },
          {
            "name": "Hình ảnh 3",
            "type": 1,
            "inputType": 8,
            "url": ""
          },
          {
            "name": "Hình ảnh 4",
            "type": 1,
            "inputType": 8,
            "url": ""
          }
        ]
      },
      {
        "name": "Video sản phẩm",
        "type": 1,
        "inputType": 10,
        "url": ""
      },
      {
        "name": "Tên sản phẩm",
        "type": 1,
        "inputType": 1,
        "maxlength": 120,
        "required": "true"
      },
      {
        "name": "Mô tả sản phẩm",
        "type": 1,
        "inputType": 1,
        "maxlength": 3000,
        "required": "true"
      },
      {
        "name": "Danh mục sản phẩm",
        "type": 1,
        "inputType": 1
      }
    ],
    "infoDetail": [
      {
        "property": {
          "name": "Thương hiệu",
          "required": true,
          "keyQuery": "Goods.Item.Properties.InfoDetail",
          "type": 1,
          "inputType": 1,
          "value": null,
          "listUnit": null,
          "properties": "[{}]",
          "isDeleted": false,
          "deleterUserId": null,
          "deletionTime": null,
          "lastModificationTime": null,
          "lastModifierUserId": 1,
          "creationTime": "2021-11-30T09:18:19.8680341",
          "creatorUserId": 1,
          "id": 10043
        },
        "order": 1
      },
      {
        "property": {
          "name": "Xuất xứ",
          "required": false,
          "keyQuery": "Goods.Item.Properties.InfoDetail",
          "type": 1,
          "inputType": 1,
          "value": null,
          "listUnit": null,
          "properties": "[{}]",
          "isDeleted": false,
          "deleterUserId": null,
          "deletionTime": null,
          "lastModificationTime": null,
          "lastModifierUserId": null,
          "creationTime": "2021-11-30T09:22:32.565895",
          "creatorUserId": 1,
          "id": 10044
        },
        "order": 2
      }
    ],
    "infoSell": [
      {
        "property": {
          "name": "Giá",
          "required": false,
          "keyQuery": "Goods.Item.Properties.InfoSeller",
          "type": 1,
          "inputType": 1,
          "value": null,
          "listUnit": null,
          "properties": "[{}]",
          "isDeleted": false,
          "deleterUserId": null,
          "deletionTime": null,
          "lastModificationTime": null,
          "lastModifierUserId": null,
          "creationTime": "2021-11-30T09:23:56.2166651",
          "creatorUserId": 1,
          "id": 10051
        },
        "order": 2
      },
      {
        "property": {
          "name": "Kho hàng( sản phẩm)",
          "required": false,
          "keyQuery": "Goods.Item.Properties.InfoSeller",
          "type": 2,
          "inputType": 1,
          "value": null,
          "listUnit": null,
          "properties": "[{}]",
          "isDeleted": false,
          "deleterUserId": null,
          "deletionTime": null,
          "lastModificationTime": null,
          "lastModifierUserId": null,
          "creationTime": "2021-11-30T09:24:06.8856222",
          "creatorUserId": 1,
          "id": 10052
        },
        "order": 3
      }
    ],
    "infoOther": [
      {
        "property": {
          "name": "Mã sản phẩm",
          "required": false,
          "keyQuery": "Goods.Item.Properties.InfoOther",
          "type": 1,
          "inputType": 1,
          "value": null,
          "listUnit": null,
          "properties": "[{}]",
          "isDeleted": false,
          "deleterUserId": null,
          "deletionTime": null,
          "lastModificationTime": null,
          "lastModifierUserId": null,
          "creationTime": "2021-11-30T09:24:47.5587877",
          "creatorUserId": 1,
          "id": 10054
        },
        "order": 1
      }
    ]
  },
}