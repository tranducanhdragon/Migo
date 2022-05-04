import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { BookingDetailDto } from 'src/model/community/BookingDetail';
import { Community } from 'src/model/community/Community';
import { appModuleAnimation } from 'src/route-animation/animation';
import { CommunityService } from 'src/service/community/community.service';
import { HubService } from 'src/service/hub/Hub.service';
import { BookingApproveComponent } from './booking-approve/booking-approve.component';
import { CommunityEditComponent } from './community-edit/community-edit.component';

@Component({
  selector: 'app-community-infor',
  templateUrl: './community-infor.component.html',
  styleUrls: ['./community-infor.component.css'],
  animations: [appModuleAnimation()]
})
export class CommunityInforComponent implements OnInit {

  communities:Community[]=[];
  community:Community={};

  bookingNotis:BookingDetailDto[]=[];

  modalOptions:NgbModalOptions={
    size: 'lg',
  };
  fileTitle:string="Chọn ảnh đại diện";
  
  constructor(private communityService:CommunityService,
    private modalService: NgbModal,
    private notiService: HubService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.notiService.StartConnection();
    this.getAllCommunities();
    this.getNotifications();
  }
  getAllCommunities(){
    this.communityService.getAllData('/api/Community/getall').subscribe(
      (res:any) => {
        if(res && res.success){
          this.communities = res.data;
        }
      }
    )
  }
  getNotifications(){
    //get all notificatiion by api
    this.communityService.getAllDataFilter('/api/Community/getallbookingforadmin').subscribe(
      (res:any) => {
        if(res.success){
          this.bookingNotis = res.data.slice(0, 10);
          console.log('bookingNotis', this.bookingNotis);
        }
      }
    )
    //get realtime notification
    this.notiService.connection?.on('ReceiveBookingNotice', (res:any) => {
      if(res){
        this.bookingNotis.push(res);
      }
    })
  }

  open(content:any) {
    this.modalService.open(content, this.modalOptions);
  }
  uploadImage(data:any){
    let formData = new FormData();
    formData.append('file', data.files[0], data.files[0].name);
    this.fileTitle = data.files[0].name;
    //gọi đến api upload, trả về đường dẫn ảnh trên server backend
    this.communityService.uploadImage(formData).subscribe(
      (res:any) => {
        if (res) {
          this.community.urlImage = res;
        }
        else {
          this.messageService.add({ severity: 'error', summary: '', detail: 'Upload thất bại !', life: 2000 });
        }
      }
    );
  }
  isSubmit:boolean=false
  submitCommunity(){
    this.isSubmit = true

    if(this.community.serviceName 
      && this.community.urlImage
      && this.community.servicePrice
      && this.community.description){
      this.communityService.post('/api/Community/insert', this.community).subscribe(
        (res:any) => {
          if(res && res.success){
            this.messageService.add({severity:'success', summary:'Thông báo', detail:'Tạo thành công',life:2000});
            this.communities.push(this.community);
            this.modalService.dismissAll();
          }
          else{
            this.messageService.add({severity:'error', summary:'Thông báo', detail:'Tạo thất bại',life:2000});
          }
        }
      )
    }
  }
  //open edit community popup
  editCommunity(communityEdited:Community){
    const modalRef = this.modalService.open(CommunityEditComponent, this.modalOptions);
    modalRef.componentInstance.community = communityEdited;
  }
  //open approve booking popup
  approveBooking(community:Community){
    const modalRef = this.modalService.open(BookingApproveComponent, this.modalOptions);
    modalRef.componentInstance.community = community;
  }
}
