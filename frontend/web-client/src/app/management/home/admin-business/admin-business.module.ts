import { StateStorePipe } from 'src/pipes/business.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AdminBusinessRoutingModule } from './admin-business-routing.module';
import { AdminBusinessComponent } from './admin-business.component';
import { TableObjectComponent } from './table-object/table-object.component';

import { TabViewModule } from 'primeng/tabview'
import { ToastModule } from 'primeng/toast'
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar'
import { FileUploadModule } from 'primeng/fileupload'
import { DividerModule } from 'primeng/divider'
import { TableModule } from 'primeng/table'
import { DialogModule } from 'primeng/dialog'
import { RadioButtonModule } from 'primeng/radiobutton'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownModule } from 'primeng/dropdown';
import { ImageModule } from 'primeng/image';
import { PanelModule } from 'primeng/panel';
import { TableItemComponent } from './table-item/table-item.component';


@NgModule({
  declarations: [
    AdminBusinessComponent,
    TableObjectComponent,
    TableItemComponent,
    StateStorePipe,
  ],
  imports: [
    CommonModule,
    AdminBusinessRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    TabViewModule,
    NgbModule,
    DialogModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    TableModule,
    RadioButtonModule,
    DialogModule,
    DividerModule,
    ButtonModule,
    ImageModule,
    DropdownModule,
    PanelModule,
    ImageModule,
  ],
  exports:[
    StateStorePipe
  ],
  providers:[
  ]
})
export class AdminBusinessModule { }
