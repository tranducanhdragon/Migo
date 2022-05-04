import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OwnerGoodsInfoDto, ShopGoodsInfoDto, WorkTimeGoodsDto } from 'src/model/bussiness/shop-goods.model';
import { appModuleAnimation } from 'src/route-animation/animation';
import { BusinessService } from 'src/service/bussiness/business.service';
import { BusinessType, OwnerType } from 'src/environments/AppEnums';
import { DataShopService } from 'src/shared/observable-service/business/data.shop.service';
import { InfoShopService } from 'src/shared/observable-service/business/info.shop.service';
import { UserTokenService } from 'src/shared/observable-service/user/user-token.service';

@Component({
  selector: 'app-owner-info',
  templateUrl: './owner-info.component.html',
  styleUrls: ['./owner-info.component.scss'],
  animations: [appModuleAnimation()],
})
export class OwnerInfoComponent implements OnInit {

  //@Input shopInfo: any;

  userId?:number;

  ownerInfo: OwnerGoodsInfoDto | any = {};

  typeOwner: number = OwnerType.invidual;

  shopInfo: ShopGoodsInfoDto | any;
  workTime : WorkTimeGoodsDto | any;

  subscription: Subscription = new Subscription;

  isSubmit:boolean=false;

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  constructor(private router: Router,
    private shopDataService: InfoShopService,
    private dataShopGoodsService: DataShopService,
    private businessService: BusinessService,
    private userTokenService:UserTokenService
    ) { }

  ngOnInit(): void {
    //get user infor
    this.userId = this.userTokenService.getUserToken()

    this.subscription = this.shopDataService.curentInforShop.subscribe(res => {
      if(res){
        this.shopInfo = res;
        console.log('shopInfo', this.shopInfo);
        
      }
    });
    this.subscription = this.shopDataService.curentInforOwner.subscribe(res => {
      if(res != null) {
        this.ownerInfo = res;
        console.log('ownerInfo', this.ownerInfo);
      } 
    });

  }

  chooseInvidual() {
    this.typeOwner = OwnerType.invidual
  }
  chooseOrganization(){
    this.typeOwner = OwnerType.organization
  }

  prevPage() {
    this.router.navigate(['/home/shop-register/shop-info']);
  }

  uploadImageBRC(event:any){
    // console.log("image", event);
    if (event.files.length > 0) {
      //this.workflowGroup.reportName = event.files[0].name;
      const formData = new FormData();
      formData.append('file', event.files[0], event.files[0].name);
      this.businessService.uploadImagePublic(formData).subscribe(
        res => {
          this.ownerInfo.imageBRC = res;
          console.log("image", this.ownerInfo.imageBRC);
        }
      );
    }
  }

  submitShop() {
    this.isSubmit = true;

    let properties = {
      shopInfo: this.shopInfo,
      ownerInfo: this.ownerInfo,
      workTime : this.workTime
    }
    let data : any = {
      userId: this.userId,
      storeType: BusinessType.CommerceGoods,
      name : this.shopInfo?.name,
      owner: this.ownerInfo.fullName,
      properties: JSON.stringify(properties),
      state : 1

    };
    if(this.validate()){
      this.businessService.createOrUpdateObject(data).subscribe(res => {
        if(res.result.success && res.result.data.properties) {
          res.result.data.properties = JSON.parse(res.result.data.properties);
          console.log('changeShop',res.result.data )
          this.dataShopGoodsService.changeShop(res.result.data);
          this.router.navigate(['/home/seller']);
          
        }
      });
    }

  }
  validate():boolean{
    if(this.typeOwner == OwnerType.organization){
      if(this.ownerInfo.fullName
        && this.ownerInfo.email
        && this.ownerInfo.phoneNumber
        && this.ownerInfo.identityNumber
        && this.ownerInfo.imageBRC
        && this.ownerInfo.tax)
        {
          return true
        }
      else{
        return false
      }
    }
    else if(this.typeOwner == OwnerType.invidual){
      if(this.ownerInfo.fullName
        && this.ownerInfo.email
        && this.ownerInfo.phoneNumber
        && this.ownerInfo.identityNumber)
        {
          return true
        }
      else{
        return false
      }
    }
    else{
      return false
    }
  }

}
