import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Review } from 'src/model/bussiness/object-data';
import { BusinessService } from 'src/service/bussiness/business.service';
import { BusinessType, FormCase, Review_FormId } from 'src/environments/AppEnums';
import { DataShopService } from 'src/shared/observable-service/business/data.shop.service';

@Component({
  selector: 'app-rating-shop',
  templateUrl: './rating-shop.component.html',
  styleUrls: ['./rating-shop.component.scss']
})
export class RatingShopComponent implements OnInit {

  reviews!: Review[];
  reviewsReplied!: Review[];
  reviewsNotReplied!: Review[];

  avgRate: number = 0;
 
 
  shopData: any;

  //reviews data
  allReviews : Review[] = [];
  shopReviews: Review[] = [];
  itemReviews: Review[] = [];
  answeredReviews: Review[] = [];
  
  constructor(
    private dataShopService: DataShopService,
    private businessService: BusinessService
  ) { }

  ngOnInit(): void {
    this.dataShopService.curentDataShop.subscribe( x => {
      this.shopData = x;
      if(x.properties) {
        this.getData();
      }
    });
    
  }

  getData() {
    let params = new HttpParams().append('type', BusinessType.CommerceGoods)
    .append('formCase', FormCase.Get_All)
    .append('formId', Review_FormId.Partner_GetAll_Review)
    .append('objectPartnerId', this.shopData.id);
    this.getReviews(params);

  }

  getReviews(params: any) : any {
    const url = "/api/Business/GetRateData";
    // this.businessService.getAllData(url, params).subscribe(
    //   res => {
    //     if(res.success) {
    //       this.allReviews = res.result.data.map((x:any) => {
    //         if(x.isItemReview &&  x.item.properties) {
    //           x.item.properties = JSON.parse(x.item.properties);
    //         }
    //         return x;
    //       });
    //       console.log('rate', this.allReviews);
    //       this.shopReviews = this.allReviews .filter(x => x.isItemReview === false &&  !(x.hasAnswered));
    //       this.itemReviews = this.allReviews.filter(x => x.isItemReview === true &&  !(x.hasAnswered));
    //       this.answeredReviews = this.allReviews.filter(x => x.hasAnswered);
    //     }
    //   }
    // );
  };
}




