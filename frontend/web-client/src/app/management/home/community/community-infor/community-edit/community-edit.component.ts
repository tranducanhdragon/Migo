import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { Community } from 'src/model/community/Community';
import { CommunityService } from 'src/service/community/community.service';

@Component({
  selector: 'app-community-edit',
  templateUrl: './community-edit.component.html',
  styleUrls: ['./community-edit.component.scss','../community-infor.component.css']
})
export class CommunityEditComponent implements OnInit {
  @Input() public community:Community={};
  fileTitle:string="Chọn ảnh đại diện";
  constructor(private communityService:CommunityService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.fileTitle = this.community.urlImage??"Chưa có ảnh đại diện";
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
  submitEditedCommunity(person:Community){
    this.communityService.put('/api/Community/update', person).subscribe(
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
