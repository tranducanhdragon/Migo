import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BookingRevenueDto, BookingDetailDto } from 'src/model/community/BookingDetail';
import { appModuleAnimation } from 'src/route-animation/animation';
import { CommunityService } from 'src/service/community/community.service';

@Component({
  selector: 'app-community-revenue',
  templateUrl: './community-revenue.component.html',
  styleUrls: [
    './community-revenue.component.scss',
    '../../../../app.component.scss'
  ],
  animations: [appModuleAnimation()],
})
export class CommunityRevenueComponent implements OnInit {
  bookings:BookingRevenueDto[]=[];
  months=[
    {name:"Tháng 1", value:1},
    {name:"Tháng 2", value:2},
    {name:"Tháng 3", value:3},
    {name:"Tháng 4", value:4},
    {name:"Tháng 5", value:5},
    {name:"Tháng 6", value:6},
    {name:"Tháng 7", value:7},
    {name:"Tháng 8", value:8},
    {name:"Tháng 9", value:9},
    {name:"Tháng 10", value:10},
    {name:"Tháng 11", value:11},
    {name:"Tháng 12", value:12},
  ];
  years=[
    {name:"Năm trước", value:new Date().getFullYear()-1},
    {name:"Năm nay", value:new Date().getFullYear()},
  ]
  selectedMonth:number=(new Date().getMonth()+1);
  selectedYear:number=(new Date().getFullYear());
  constructor(private commnunityService:CommunityService) {
    
  }

  ngOnInit(): void {
  }

  isLoading:boolean=false
  getRevenueByTime(){
    this.isLoading = true
    this.commnunityService.getRevenueByTime('/api/Community/getrevenuebytime', this.selectedMonth, this.selectedYear).subscribe(
      (res:any) => {
        this.isLoading = false
        if(res){
          this.bookings = res.data;
        }
      }
    )
  }
}
