import { HttpParams } from '@angular/common/http'
import {
  Component,
  Inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core'
import { Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { ItemsDto } from 'src/model/bussiness/object-data'
import { BusinessService } from 'src/service/bussiness/business.service'
import { AppComponentBase } from 'src/shared/app-component-base'
import { State_Item, State_Object } from 'src/environments/AppEnums'
import { DataShopService } from 'src/shared/observable-service/business/data.shop.service'
import { ProductGoodsService } from 'src/shared/observable-service/business/product-goods.service'

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent extends AppComponentBase implements OnInit {
  @Input() itemProducts: Observable<ItemsDto[]> = new Observable()
  shopData: any
  selectedProducts: any[] = []
  submitted!: boolean
  dishDialog!: boolean
  subscription: Subscription = new Subscription()
  categories = [
    'Các món cuốn',
    'Xiên que',
    'Bánh tráng',
    'Kem',
  ]

  constructor(
    private router: Router,
    injector: Injector,
    private businessService: BusinessService,
    private dataShopService: DataShopService,
    private productGoodsService: ProductGoodsService,
  ) {
    super(injector)
    this.dataShopService.curentDataShop.subscribe((x) => (this.shopData = x))
  }

  ngOnInit(): void {}

  openNew() {
    this.router.navigate(['/home/seller/add-product'])
  }

  deleteSelectedDishs() {
    // this.confirmationService.confirm({
    //   message: 'Are you sure you want to delete the selected dishs?',
    //   header: 'Confirm',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //     this.dishes = this.dishes.filter(val => !this.selectedDishes.includes(val));
    //     this.selectedDishes = [];
    //   //  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Dishs Deleted', life: 3000 });
    //   }
    // });
  }

  editedProduct:ItemsDto=new ItemsDto()
  dialogProductInfo:boolean=false
  editProduct(product:any) {
    this.dialogProductInfo = true
    this.editedProduct = JSON.parse(JSON.stringify(product))
    this.productGoodsService.changeProductGoods(product)
  }
  submitProduct(){
    let editedDto = new ItemsDto()
    editedDto.init(this.editedProduct)
    editedDto.state = State_Item.New
    editedDto.properties = JSON.stringify(editedDto.properties)

    this.businessService.createOrUpdateItem(editedDto).subscribe((res) => {
      this.dialogProductInfo = false
      if (res.result.success) {
        this.messageP.add({ 
          severity: 'success', 
          summary: 'Successful', 
          detail: 'Cập nhật sản phẩm thành công!', 
          life: 3000 });
      }
      else{
        this.messageP.add({ 
          severity: 'error', 
          summary: 'Failed', 
          detail: 'Cập nhật sản phẩm thất bại!', 
          life: 3000 });
      }
    })
    
  }
  deleteProduct(product:any) {
    // this.confirmationService.confirm({
    //   message: 'Are you sure you want to delete ' + dish.name + '?',
    //   header: 'Confirm',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //     this.dishes = this.dishes.filter(val => val.id !== dish.id);
    //     this.dish = {
    //       id: 0,
    //       name: '',
    //       price: 0,
    //       category: '',
    //       image: '',
    //       description: '',
    //       avgRate: 0
    //     };
    //    // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Dish Deleted', life: 3000 });
    //   }
    // });
  }
  deleteLocalFile(image:any) {
    image.url = ''
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

  hideDialog() {
    this.dishDialog = false
    this.submitted = false
  }

  saveDish() {}

  findIndexById(id: number) {}

  createId(): number {
    return Math.floor(Math.random() * 100) + 4
  }
}
