import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { Citizen } from 'src/model/citizen/Citizen';
import { CitizenService } from 'src/service/citizen/citizen.service';

@Component({
  selector: 'app-citizen-edit',
  templateUrl: './citizen-edit.component.html',
  styleUrls: ['./citizen-edit.component.scss']
})
export class CitizenEditComponent implements OnInit {
  @Input() public citizen:Citizen={};
  fileTitle:string="Chọn ảnh đại diện";
  constructor(private citizenService:CitizenService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private messageService: MessageService) { }

  ngOnInit(): void {
    console.log('citizenEdit', this.citizen);
    this.fileTitle = this.citizen.urlImage??"Chưa có ảnh đại diện";
  }
  uploadImage(data:any){
    let formData = new FormData();
    formData.append('file', data.files[0], data.files[0].name);
    this.fileTitle = data.files[0].name;
    //gọi đến api upload, trả về đường dẫn ảnh trên server backend
    this.citizenService.uploadImage(formData).subscribe(
      (res:any) => {
        if (res) {
          this.citizen.urlImage = res;
        }
        else {
          this.messageService.add({ severity: 'error', summary: '', detail: 'Upload thất bại !', life: 2000 });
        }
      }
    );
  }
  submitEditedCitizen(person:Citizen){
    this.citizenService.put('/api/Citizen/update', person).subscribe(
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
