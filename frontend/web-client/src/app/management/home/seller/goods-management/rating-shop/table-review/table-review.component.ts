import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Review } from 'src/model/bussiness/object-data';
import { BusinessService } from 'src/service/bussiness/business.service';

@Component({
  selector: 'table-review',
  templateUrl: './table-review.component.html',
  styleUrls: ['./table-review.component.scss']
})
export class TableReviewComponent implements OnInit {

  @Input() dataSource: any;
  @Input() shopData: any;

  answeredRate: Review = {};

  options = [
    {
      label: 'Tất cả',
      value: 0
    },
    {
      label: '5 sao',
      value: 5
    },
    {
      label: '4 sao',
      value: 4
    },
    {
      label: '3 sao',
      value: 3
    },
    {
      label: '2 sao',
      value: 2
    },
    {
      label: '1 sao',
      value: 1
    },
  ];
  selectedOption = 0;

  constructor(
    private message: MessageService,
    private businessService: BusinessService
  ) { }

  ngOnInit() {
  }

  onRowEditInit(review : Review) {
    console.log('reviewed', review);
    if(!review.answerd) {
      review.answerd = {};
    }
    
  }

  onRowEditSave(review :Review ) {
    if(review.answerd){
      review.answerd.answerRateId = review.id;
      review.answerd.userName = this.shopData.name;
    }

    let url = "/api/Business/CreateOrUpdateRate";
    if(review.answerd && review.answerd.comment && review.answerd.comment != null && review.answerd.comment != '' ) {
      
      console.log('answerReview', review)
      // this.businessService.createOrUpdateRate(review.answerd, url).subscribe(x => {
      //   if(x.success) {
      //     this.message.add({
      //       severity: 'success',
      //       summary: '',
      //       detail: 'Trả lời đánh giá thành công !',
      //       life: 4000,
      //     })
           
      //   }
      //   else if(x.error) {
      //     this.message.add({
      //       severity: 'error',
      //       summary: '',
      //       detail: 'Hệ thống có lỗi !',
      //       life: 4000,
      //     })
      //   }
      // });
    }
  }

  onRowEditCancel(review:any) {
    if(!review.answerd) {
      review.answerd = {};
    }
  }

}

