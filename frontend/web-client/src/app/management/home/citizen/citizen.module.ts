import { NgModule } from '@angular/core';
import { CitizenRoutingModule } from './citizen-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CitizenComponent } from './citizen.component';
import { CitizenMenuComponent } from './citizen-menu/citizen-menu.component';
import { CitizenInforComponent } from './citizen-infor/citizen-infor.component';
import { CitizenChatComponent } from './citizen-chat/citizen-chat.component';
import { CommonModule } from '@angular/common';
import { HubService } from 'src/service/hub/Hub.service';
import { ToastModule } from 'primeng/toast';
import { CitizenEditComponent } from './citizen-infor/citizen-edit/citizen-edit.component';
import { UserEditComponent } from './citizen-infor/user-edit/user-edit.component';
import { SharedModule } from 'src/shared/shared.module';
import { TableModule } from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  declarations: [
    CitizenComponent,
    CitizenMenuComponent,
    CitizenInforComponent,
    CitizenChatComponent,
    CitizenEditComponent,
    UserEditComponent
  ],
  imports: [
    CitizenRoutingModule,
    FormsModule,
    NgbModule,
    CommonModule,
    ToastModule,
    TableModule,
    InputTextModule,
    //bootstrap

    
    //common
    SharedModule,
  ],
  providers: [HubService],
  bootstrap: [CitizenComponent]
})
export class CitizenModule { }
