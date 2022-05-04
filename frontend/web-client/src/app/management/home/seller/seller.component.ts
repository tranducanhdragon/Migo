import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { appModuleAnimation } from 'src/route-animation/animation';
import { AppComponentBase } from 'src/shared/app-component-base';
import { AllTypesProductService } from 'src/shared/observable-service/business/all-types-product.service';
import { BusinessService } from 'src/service/bussiness/business.service';
import { DataShopService } from 'src/shared/observable-service/business/data.shop.service';
import { HttpParams } from '@angular/common/http';
import { BusinessType, FormCase, Object_FormId } from 'src/environments/AppEnums';
import { UserTokenService } from 'src/shared/observable-service/user/user-token.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss'],
  animations: [appModuleAnimation()],
})
export class SellerComponent implements OnInit, OnDestroy {

  isRegisterButton: boolean = false
  storeData: any = {};
  subscription: Subscription | any

  userId:number=0

  constructor(
    private router: Router,
    private businessService: BusinessService,
    private dataShopService: DataShopService,
    private userTokenService:UserTokenService
  ) {
    //this.checkRegister();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  registerClick() {
    this.isRegisterButton = !this.isRegisterButton
    this.router.navigate([
      '/home/shop-register/shop-info',
    ])
  }

  ngOnInit(): void {
    //get user infor
    this.userId = this.userTokenService.getUserToken()

    this.getDataStore()
  }

  getDataStore() {
    let params = new HttpParams()
      .append('type', BusinessType.CommerceGoods)
      .append('userId', this.userId)
      .append('formCase', FormCase.Get_Detail)
      .append('formId', Object_FormId.Partner_Object_Detail)
    const url = '/api/Business/GetObjectData'
    this.subscription = this.businessService
      .getAllData(url, params)
      .subscribe((res) => {
        this.storeData = res.result.data
        if (res.result.data) {
          if (this.storeData.properties) {
            this.storeData.properties = JSON.parse(this.storeData.properties)
            console.log('storeData', this.storeData)
          }
          //update shop data to localstorage
          this.dataShopService.changeShop(this.storeData)
        } 
        else{
          this.isRegisterButton = true
        } 
      })
  }

}

