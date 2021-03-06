import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home.component';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ShortDescriptionPipe } from 'src/pipes/description.pipe';
import { SharedModule } from 'src/shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    //component
    HomeComponent,

  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    FormsModule,
    NgbModule,
    ToastModule,
    ButtonModule,
    TableModule,

    //common
    SharedModule
  ],
  providers: [
  ],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
