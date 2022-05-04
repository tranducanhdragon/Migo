import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityRoutingModule } from './community-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'primeng/toast';
import { CommunityComponent } from './community.component';
import { CommunityMenuComponent } from './community-menu/community-menu.component';
import { CommunityInforComponent } from './community-infor/community-infor.component';
import { CommunityRevenueComponent } from './community-revenue/community-revenue.component';
import { CommunityBookingComponent } from './community-booking/community-booking.component';
import { CommunityEditComponent } from './community-infor/community-edit/community-edit.component';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { BookingDetailComponent } from './community-booking/booking-detail/booking-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookingApproveComponent } from './community-infor/booking-approve/booking-approve.component';
import { HubService } from 'src/service/hub/Hub.service';
import { BadgeModule} from 'primeng/badge';
import { ButtonModule} from 'primeng/button';
import { CheckboxModule} from 'primeng/checkbox';
import { SharedModule } from 'src/shared/shared.module';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    CommunityComponent,
    CommunityEditComponent,
    CommunityMenuComponent,
    CommunityInforComponent,
    CommunityRevenueComponent,
    CommunityBookingComponent,
    BookingDetailComponent,
    BookingApproveComponent,
  ],
  imports: [
    CommunityRoutingModule,
    FormsModule,
    NgbModule,
    CommonModule,
    ToastModule,
    UiSwitchModule,
    BadgeModule,
    ButtonModule,
    CheckboxModule,
    TableModule,
    //common
    SharedModule
  ],
  providers: [HubService],
  bootstrap: [CommunityComponent]
})
export class CommunityModule { }
