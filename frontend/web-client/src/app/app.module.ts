import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { CommunityComponent } from './management/community/community.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { AuthInterceptor } from 'src/auth/auth.intercepter';
import { TourService } from 'src/service/community/community.service';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { BadgeModule} from 'primeng/badge';
import { DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import { DestinationComponent } from './management/destination/destination.component';
import { SignInComponent } from './management/sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    CommunityComponent,
    DestinationComponent,
    SignInComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ToastModule,
    UiSwitchModule,
    RouterModule,
    ButtonModule,
    TableModule,
    BadgeModule,
    DropdownModule,
    CheckboxModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
