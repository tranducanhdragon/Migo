import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BookingDetailDto } from 'src/model/community/BookingDetail';
import { Community } from 'src/model/community/Community';
import { appModuleAnimation } from 'src/route-animation/animation';
import { BookingDetailService } from 'src/service/community/booking-detail.service';
import { HubService } from 'src/service/hub/Hub.service';
import { Booking_State } from 'src/environments/AppEnums';

@Component({
  selector: 'app-booking-approve',
  templateUrl: './booking-approve.component.html',
  styleUrls: ['./booking-approve.component.scss'],
  animations: [appModuleAnimation()]
})
export class BookingApproveComponent implements OnInit {
  @Input() public community:Community={};
  bookings:BookingDetailDto[]=[];

  constructor(private bookingDetailService:BookingDetailService,
    private bookingApprove: HubService) { }

  ngOnInit(): void {
    this.bookingApprove.StartConnection();
    this.getAllBookingForAdmin();
    this.onBookingUpdate()
  }
  getAllBookingForAdmin(){
    let prs = new HttpParams()
    .append('communityId', this.community.communityId??0)

    this.bookingDetailService.getAllDataFilter('/api/Community/getallbookingforadmin', prs).subscribe(
      (res:any) => {
        if(res && res.success){
          console.log('bookingDetail', res.data);
          this.bookings = res.data;
        }
      }
    )
  }
  submitBooking(booking:BookingDetailDto, typeChoose:number){
    if(typeChoose == 1){
      booking.state = Booking_State.Approved;
    }
    else if(typeChoose == 2){
      booking.state = Booking_State.Refused
    }
    this.bookingApprove.ApproveBooking(booking);
    // let indexRemoved = this.bookings.indexOf(booking);
    // if(indexRemoved > -1){
    //   this.bookings.splice(indexRemoved, 1);
    // }
  }
  onBookingUpdate(){
    this.bookingApprove.connection?.on('BookingUpdated', (res:any) => {
      if(res){
        this.bookings.forEach(b => {
          if(b.bookingDetailId == res.bookingDetailId){
            b.state = Booking_State.Approved;
          }
        })
      }
    });
  }
}
