import { Component, Input, OnInit, Injector } from '@angular/core'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { AppComponentBase } from 'src/shared/app-component-base'
import { BusinessService } from 'src/service/bussiness/business.service'
import { State_Object } from 'src/environments/AppEnums'

@Component({
  selector: 'app-table-object',
  templateUrl: './table-object.component.html',
  styleUrls: ['./table-object.component.scss'],
})
export class TableObjectComponent extends AppComponentBase implements OnInit {
  @Input() params: any
  stores: Observable<any[]> = new Observable();
  shopSelect: any
  editShop: any = {}
  isUpdateStore = true
  dialogStoreInfo: boolean = false
  isAccept:any
  uploadedFiles:any
  index = 0
  zoom = 15
  header = 'Sửa cửa hàng';
  a = false;
  constructor(
    private businessService: BusinessService,
    private injector: Injector,
    private router: Router,
  ) {
    super(injector)
  }

  ngOnInit() {
    this.getStoreByParam()
  }

  viewInfo(shop:any) {
    this.editShop = shop
    this.dialogStoreInfo = true
    console.log('editShop', shop)
  }

  getStoreByParam(): any {
    const url = '/api/Business/GetObjectData'
    this.stores = this.businessService.getAllDataAsync(url, this.params).pipe(
      map((val:any) => {
        console.log('store', val);
        
        return val.map((x:any) => {
          x.properties = JSON.parse(x.properties)
          return x
        })
      }),
    )
  }

  deleteShop(shop: any) {
    this.businessService
      .deleteById(
        shop.id,
        '/api/Business/DeleteObject?id=',
      )
      .subscribe((res:any) => {
        if (res.result.success) {
          this.messageP.add({
            severity: 'success',
            summary: '',
            detail: 'Xóa thành công !',
            life: 4000,
          })
          this.stores = this.stores.pipe(
            map((data:any) => data.filter((obj:any) => obj.id !== shop.id)),
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


  beforeChange(event:any) {}

  onChange(event:any) {
    this.index = event.index
  }

  addContact() {}
  deleteContact(id:any) {}

  submitObjectBusiness() {
    this.editShop.state = State_Object.Active
    this.editShop.properties = JSON.stringify(this.editShop.properties)
    this.businessService
      .createOrUpdateObject(this.editShop)
      .subscribe((res:any) => {
        if (res.result.success) {
          this.messageP.add({
            severity: 'success',
            summary: '',
            detail: 'Cập nhật thành công!',
            life: 3000,
          })
          console.log('submitStoreObject', this.editShop)
        }
      })
    this.dialogStoreInfo = false
  }

  showSecondTab() {
    this.index = 1
  }

  showFirstTab() {
    this.index = 0
  }

  markerDragEnd($event: any) {
    this.editShop.latitude = $event.latLng.lat()
    this.editShop.longitude = $event.latLng.lng()
  }

  closeCreateObject() {
    this.dialogStoreInfo = false
  }
}
