import { HttpParams } from '@angular/common/http'
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  Injector,
} from '@angular/core'
import { Table } from 'primeng/table'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { ItemsDto, ItemViewDto } from 'src/model/bussiness/object-data'
import { BusinessService } from 'src/service/bussiness/business.service'
import { AppComponentBase } from 'src/shared/app-component-base'


@Component({
  selector: 'app-table-item',
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.scss'],
})

   
export class TableItemComponent extends AppComponentBase implements OnInit {
  // @Input() dataSource : Observable<DataResponse<ItemsDto[]>>;
  @Input() isNew?: boolean
  @Input() params?: HttpParams = new HttpParams()
  @Output() itemAccept = new EventEmitter<ItemsDto>()

  products: Observable<ItemsDto[]> = new Observable

  productSelect: any[] = []
  totalRecords: Observable<number> = of(0)

  index = 0
  itemView: ItemsDto = new ItemsDto
  showDialogDetailProduct: boolean = false

  @ViewChild('dt') dataTable: Table | any

  constructor(injector: Injector, private businessService: BusinessService) {
    super(injector)
  }

  ngOnInit() {
    // this.dataSource.subscribe((x) => {
    //   if (x.totalRecords) {
    //     this.totalRecords = of(x.totalRecords)
    //     console.log('total', x)
    //   }
    // })
    this.getProductsByParams(this.params)
  }

  deleteLocalFile(image:any) {
    image.url = ''
  }

  onChange(event:any) {
    this.index = event.index
  }

  
  nextTab(id:number) {
    this.index = id
  }
  backTab(id:number) {
    this.index = id
  }

  save() {
    let item = new ItemsDto(this.itemView)
    item.properties = JSON.stringify(item.properties)
    console.log('itemDetail', item)
    this.businessService.createOrUpdateItem(item).subscribe((res) => {
      if (res.result.success) {
        this.messageP.add({
          severity: 'success',
          summary: '',
          detail: 'Cập nhật trạng thái thành công !',
          life: 4000,
        })
      } else {
        this.messageP.add({
          severity: 'error',
          summary: '',
          detail: 'Hệ thống có lỗi !',
          life: 4000,
        })
      }
    })

    this.showDialogDetailProduct = false
    this.getProductsByParams(this.params)
  }

  closeCreateObject() {
    this.showDialogDetailProduct = false
  }

  getProducts(): any {
    const url = '/api/Business/GetItemData'
    this.products = this.businessService.getAllData(url, this.params).pipe(
      map((res) => {
        res.result.data.map((x:any) => {
          x.properties = JSON.parse(x.properties)
          return x
        })
        return res.result
      }),
    )

  }

  setCurrentPage(n: number) {
    this.dataTable.totalRecords = n
  }

  // changItemState(value: ItemsDto) {
  //   this.itemAccept.emit(value)
  // }

  acceptProduct(product: any) {
    console.log('product', product)
    //   product.state = State_Object.Active
    //   let item = new ItemsDto(product)
    //   item.properties = JSON.stringify(item.properties)
    //   item.state = State_Object.Active

    //   this.businessService.createOrUpdateItems(item).subscribe((res) => {
    //     if (res) {
    //       this.changItemState(product)
    //     }
    //   })
  }

  viewProduct(product:any) {
    this.showDialogDetailProduct = true
    this.itemView = product
    console.log('itemView', this.itemView)
  }

  deleteProduct(product: any) {
    this.businessService
    .deleteById(
      product.id,
      '/api/Business/DeleteItems?id=',
    )
    .subscribe((res) => {
      if (res.result.success) {
        this.messageP.add({
          severity: 'success',
          summary: '',
          detail: 'Xóa thành công !',
          life: 4000,
        })
        this.products = this.products.pipe(
          map((x) => {
            // x.data.filter((obj:any) => obj.id !== product.id);
            return x;
          })
        )
      } else {
        this.messageP.add({
          severity: 'error',
          summary: '',
          detail: 'Hệ thống có lỗi !',
          life: 4000,
        })
      }
    })

  }

  changPages(event:any) {
    //this.loading = true;
    //console.log('changPages', event);
    let prm = this.params??new HttpParams()
    // .append('skipCount', event.first)
    // .append('maxResultCount', event.rows);
    // this.getProducts(prm);
    // this.loading = false;
      .append('skipCount', event.first)
      .append('maxResultCount', event.rows)
    this.getProductsByParams(prm)
  }

  getProductsByParams(params: any) {
    const url = '/api/Business/GetItemData'
    this.products = this.businessService.getAllData(url, params).pipe(
      map((res) => {
        if (res.result.data) {
          res.result.data.map((x:any) => {
            x.properties = JSON.parse(x.properties)
            return x
          })
          this.totalRecords = of(res.result.totalRecords);
          console.log('Items',res.result.data);
          return res.result.data;
        }
        else{

        }
      }),
    )
  }
}
