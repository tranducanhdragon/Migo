import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShopGoodsInfoDto } from 'src/model/bussiness/shop-goods.model';
import { appModuleAnimation } from 'src/route-animation/animation';
import { BusinessService } from 'src/service/bussiness/business.service';
import { InfoShopService } from 'src/shared/observable-service/business/info.shop.service';

@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.component.html',
  styleUrls: ['./shop-info.component.scss'],
  animations: [appModuleAnimation()],
})
export class ShopInfoComponent implements OnInit, OnDestroy {

  basicInfo: any;
  submitted: boolean = false;
  shopInfo: ShopGoodsInfoDto | any = new ShopGoodsInfoDto();
  subscription: Subscription = new Subscription;
  location: any;

  
  selectedMarker: any

  isNext:boolean=false;
  
  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  constructor(private router: Router,
    private shopDataService: InfoShopService, 
    private businessService: BusinessService,

    ) { }

  ngOnInit(): void {
    this.subscription = this.shopDataService.curentInforShop.subscribe(res =>
      {
        if(res && this.shopInfo) {
          this.shopInfo = res;
        }
    });
    
  }
  

  cancel() {
    window.location.href = '/home/seller';
  }

  nextPage() {
    this.isNext = true;

    if(this.shopInfo?.name
      && this.shopInfo.address
      && this.shopInfo.phoneNumber){
      this.shopDataService.changeShop(this.shopInfo);
      this.router.navigate(['/home/shop-register/owner-info']);
    }
  }

  uploadImage(event:any){
   // console.log("image", event);
    if (event.files.length > 0) {
      //this.workflowGroup.reportName = event.files[0].name;
      const formData = new FormData();
  
      formData.append('file', event.files[0], event.files[0].name);
 
      this.businessService.uploadImagePublic(formData).subscribe(
        res => {
          if(this.shopInfo){
            this.shopInfo.imageUrl = res;
          }
          console.log("image", this.shopInfo?.imageUrl);
        }
      );
    }
  }
  
}

