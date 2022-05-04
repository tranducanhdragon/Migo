import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { Citizen } from 'src/model/citizen/Citizen';
import { User } from 'src/model/user/User';
import { appModuleAnimation } from 'src/route-animation/animation';
import { CitizenService } from 'src/service/citizen/citizen.service';
import { UserService } from 'src/service/user/user.service';
import { CitizenEditComponent } from './citizen-edit/citizen-edit.component';
import { UserEditComponent } from './user-edit/user-edit.component';

@Component({
  selector: 'app-citizen-infor',
  templateUrl: './citizen-infor.component.html',
  styleUrls: ['./citizen-infor.component.css'],
  animations: [appModuleAnimation()]
})
export class CitizenInforComponent implements OnInit {

  active = 1;
  citizens:Citizen[]=[];
  users:User[]=[];
  citizen:Citizen={};
  user:User={};
  fileTitle:string="Chọn ảnh đại diện";
  modalOptions:NgbModalOptions={
    size: 'lg',
  };
  constructor(
    private citizenService:CitizenService,
    private userService:UserService,
    private modalService: NgbModal,
    private messageService: MessageService) { 

    }

  ngOnInit(): void {
    this.citizenService.getAllData('/api/Citizen/getall').subscribe(
      (res:any) => {
        if(res.success){
          console.log('citizens', res.data);
          this.citizens = res.data;
        }
      }
    );
    this.userService.getAllData('/api/User/getall').subscribe(
      (res:any) => {
        if(res.success){
          this.users = res.data;
        }
      }
    )
  }
  open(content:any) {
    this.modalService.open(content, this.modalOptions);
  }
  uploadImage(data:any){
    let formData = new FormData();
    formData.append('file', data.files[0], data.files[0].name);
    this.fileTitle = data.files[0].name;
    //gọi đến api upload, trả về đường dẫn ảnh trên server backend
    this.citizenService.uploadImage(formData).subscribe(
      res => {
        if (res) {
          this.citizen.urlImage = res;
        }
        else {
          this.messageService.add({ severity: 'error', summary: '', detail: 'Upload thất bại !', life: 2000 });
        }
      }
    );
  }
  uploadUserImage(data:any){
    let formData = new FormData();
    formData.append('file', data.files[0], data.files[0].name);
    this.fileTitle = data.files[0].name;
    //gọi đến api upload, trả về đường dẫn ảnh trên server backend
    this.userService.uploadImage(formData).subscribe(
      res => {
        if (res) {
          this.user.urlImage = res;
        }
        else {
          this.messageService.add({ severity: 'error', summary: '', detail: 'Upload thất bại !', life: 2000 });
        }
      }
    );
  }

  isSubmitUser:boolean=false
  submitUser(){
    this.isSubmitUser = true

    if(this.user.fullName
      && this.user.identityNumber
      && this.user.urlImage
      && this.user.roleId
      && this.user.userName
      && this.user.password)
    {
      this.userService.post('/api/User/register', this.user).subscribe(
        (res:any) => {
          if(res && res.success){
            this.messageService.add({severity:'success', summary:'Thông báo', detail:'Tạo thành công',life:2000});
            this.users.push(this.user);
            this.modalService.dismissAll();
          }
          else{
            this.messageService.add({severity:'error', summary:'Thông báo', detail:'Tạo thất bại',life:2000});
          }
        }
      )
    }
  }
  editUser(user:User){
    const modalRef = this.modalService.open(UserEditComponent, this.modalOptions);
    modalRef.componentInstance.user = user;
  }
  deleteUser(user:User){

  }

  isSubmitCitizen:boolean=false
  submitCitizen(){
    this.isSubmitCitizen = true

    if(this.citizen.citizenName
      && this.citizen.address
      && this.citizen.dateOfBirth
      && this.citizen.gender
      && this.citizen.identityNumber
      && this.citizen.urlImage
      && this.citizen.userId){
        
        this.citizenService.post('/api/Citizen/insert', this.citizen).subscribe(
          (res:any) => {
            if(res && res.success){
              this.messageService.add({severity:'success', summary:'Thông báo', detail:'Tạo thành công',life:2000});
              this.citizens.push(this.citizen);
              this.modalService.dismissAll();
            }
            else{
              this.messageService.add({severity:'error', summary:'Thông báo', detail:'Tạo thất bại',life:2000});
            }
          }
        )
    }
  }
  editCitizen(citizenEdited:Citizen){
    const modalRef = this.modalService.open(CitizenEditComponent, this.modalOptions);
    modalRef.componentInstance.citizen = citizenEdited;
  }
  deleteCitizen(citizenDeleted:Citizen){
    this.citizenService.delete('/api/Citizen/delete', citizenDeleted).subscribe(
      (res:any) => {
        if(res && res.success){
          this.messageService.add({severity:'success', summary:'Thông báo', detail:'Xóa thành công',life:2000});
          this.citizens = this.citizens.filter(ct => ct.citizenId != citizenDeleted.citizenId);
        }
        else{
          this.messageService.add({severity:'error', summary:'Thông báo', detail:'Xóa thất bại',life:2000});
        }
      }
    )
  }

  searchUsers(event:any){
    let prs = new HttpParams().append('userName', event.target.value)
    this.citizenService.getAllDataFilter('/api/Citizen/getallusersfilter', prs).subscribe(
      (res:any) => {
        if(res && res.success){
          this.users = res.data
        }
        else{
          this.messageService.add({severity:'error', summary:'Thông báo', detail:'Xóa thất bại',life:2000});
        }
      }
    )
  }
  searchCitizens(event:any){
    let prs = new HttpParams().append('keyword', event.target.value)
    this.citizenService.getAllDataFilter('/api/Citizen/getallcitizensfilter', prs).subscribe(
      (res:any) => {
        if(res && res.success){
          this.citizens = res.data
        }
        else{
          this.messageService.add({severity:'error', summary:'Thông báo', detail:'Xóa thất bại',life:2000});
        }
      }
    )
  }
}
