import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { User } from 'src/model/user/User';
import { UserService } from 'src/service/user/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss', '../citizen-infor.component.css']
})
export class UserEditComponent implements OnInit {

  @Input() public user:User={};
  fileTitle:string="Chọn ảnh đại diện";
  constructor(private userService:UserService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.fileTitle = this.user.urlImage??"Chưa có ảnh đại diện";
  }
  uploadUserImage(data:any){
    let formData = new FormData();
    formData.append('file', data.files[0], data.files[0].name);
    this.fileTitle = data.files[0].name;
    //gọi đến api upload, trả về đường dẫn ảnh trên server backend
    this.userService.uploadImage(formData).subscribe(
      (res:any) => {
        if (res) {
          this.user.urlImage = res;
        }
        else {
          this.messageService.add({ severity: 'error', summary: '', detail: 'Upload thất bại !', life: 2000 });
        }
      }
    );
  }
  submitEditedUser(person:User){
    this.userService.put('/api/User/update', person).subscribe(
      (res:any) => {
        if(res && res.success){
          this.messageService.add({severity:'success', summary:'Thông báo', detail:'Sửa thành công', life:2000});
          this.modalService.dismissAll();
        }
        else{
          this.messageService.add({severity:'error', summary:'Thông báo', detail:'Sửa thất bại', life:2000});
        }
      }
    )
  }
}
