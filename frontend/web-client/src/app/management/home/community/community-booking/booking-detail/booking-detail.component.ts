import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { BookingDetailDto } from 'src/model/community/BookingDetail';
import { Community } from 'src/model/community/Community';
import { User } from 'src/model/user/User';
import { appModuleAnimation } from 'src/route-animation/animation';
import { BookingDetailService } from 'src/service/community/booking-detail.service';
import { CommunityService } from 'src/service/community/community.service';
import { HubService } from 'src/service/hub/Hub.service';
import { UserService } from 'src/service/user/user.service';
import { Booking_State } from 'src/environments/AppEnums';
import { UserTokenService } from 'src/shared/observable-service/user/user-token.service';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss'],
  animations: [appModuleAnimation()]
})
export class BookingDetailComponent implements OnInit {
  serviceId:number | any;
  bookings:BookingDetailDto[]=[];
  booking:BookingDetailDto={};
  serviceInfor:Community={};
  userInfor:User={};
  modalOptions:NgbModalOptions={
    size: 'sm',
  };
  constructor(private route: ActivatedRoute,
    private modalService: NgbModal,
    private messageService: MessageService,
    private userService:UserService,
    private communityService:CommunityService,
    private bookingDetailService: BookingDetailService,
    private userTokenService:UserTokenService,
    private bookingApprove: HubService) {

  }

  ngOnInit(): void {
    //get user infor
    this.booking.userId = this.userTokenService.getUserToken()
    this.getUserInfor(this.booking.userId.toString());

    //get service infor
    this.serviceId = this.route.snapshot.paramMap.get('id');
    this.getServiceInfor(this.serviceId);
    
    //get all booking of this service
    this.getAllBookingDetail(this.serviceId);
    
    //open connection for realtime
    this.bookingApprove.StartConnection();
    this.onBookingUpdate();
  }
  getServiceInfor(serviceId:string){
    this.communityService.getById('/api/Community/getbyid', serviceId).subscribe(
      (res:any) => {
        if(res.success){
          this.serviceInfor = res.data;
        }
      }
    )
  }
  getAllBookingDetail(serviceId:string){
    let prs = new HttpParams()
    .append('communityId', serviceId)
    .append('userId', this.booking.userId??0)

    this.bookingDetailService.getAllDataFilter('/api/Community/getalldetailbyservice', prs).subscribe(
      (res:any) => {
        if(res.success){
          this.bookings = res.data;
        }
      }
    )
  }
  open(content:any) {
    this.modalService.open(content, this.modalOptions);
  }
  submitBooking(){
    this.setBookingInfor();
    //send realtime booking notifications to admin account
    this.bookingApprove.ApproveBooking(this.booking);
    //send api request
    this.bookingDetailService.post('/api/Community/createdetail', this.booking).subscribe(
      (res:any) => {
        this.modalService.dismissAll('Cross click')
        if(res.success){
          this.messageService.add({ severity: 'success', summary: '', detail: 'Đặt thành công !', life: 2000 });
          this.bookings.push(this.booking);
        }
        else{
          this.messageService.add({ severity: 'error', summary: '', detail: 'Đặt thất bại !', life: 2000 });
        }
      }
    )
    
  }
  setBookingInfor(){
    this.booking.fullName = this.userInfor.fullName;
    this.booking.identityNumber = this.userInfor.identityNumber;
    this.booking.phoneNumber = this.userInfor.phoneNumber;
    this.booking.communityId = Number(this.serviceId);
    this.booking.serviceName = this.serviceInfor.serviceName;
    this.booking.state = Booking_State.Pending;
    this.booking.bookingDetailId = 0;
    if(this.booking.startTime && this.booking.endTime && this.serviceInfor.servicePrice){
      let start = new Date(this.booking.startTime),
          end = new Date(this.booking.endTime);
      let hours = Math.round((end.getTime() - start.getTime()) / (36*100000));
      this.booking.total = this.serviceInfor.servicePrice * hours;
    }
  }
  getUserInfor(userId:string){
    this.userService.getById('/api/User/getbyid', userId).subscribe(
      (res:any) => {
        if(res.success){
          this.userInfor = res.data; 
        }
      }
    )
  }
  /**
   * Listening to update booking realtime
   */
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
