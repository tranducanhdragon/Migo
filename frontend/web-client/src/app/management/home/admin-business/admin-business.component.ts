import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { appModuleAnimation } from 'src/route-animation/animation';
import { BusinessService } from 'src/service/bussiness/business.service';
import { Admin_Object_FormId, BusinessType, Object_FormId } from 'src/environments/AppEnums';

@Component({
  selector: 'app-admin-business',
  templateUrl: './admin-business.component.html',
  styleUrls: ['./admin-business.component.scss'],
  animations: [appModuleAnimation()],
})
export class AdminBusinessComponent implements OnInit, OnDestroy {
  shopNew?: Observable<any[]>
  shopActive?: Observable<any[]>
  shopDisable?: Observable<any[]>
  shopRefuse?: Observable<any[]>
  data: any
  subscription?: Subscription

  params1?: HttpParams
  params2?: HttpParams
  params3?: HttpParams
  params4?: HttpParams
  params5?: HttpParams

  constructor(private businessService: BusinessService) {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.getAllData()
  }

  getAllData() {
    this.params1 = new HttpParams()
      .append('type', BusinessType.CommerceGoods)
      .append('formCase', 1)
      .append('formId', Admin_Object_FormId.Admin_GetAll_Object_NEW)
      .append('skipCount', 1)
      .append('maxResultCount', 10);
    this.params2 = new HttpParams()
      .append('type', BusinessType.CommerceGoods)
      .append('formCase', 1)
      .append('formId', Admin_Object_FormId.Admin_GetAll_Object_ACTIVE)
      .append('skipCount', 1)
      .append('maxResultCount', 10);
    this.params3 = new HttpParams()
      .append('type', BusinessType.CommerceGoods)
      .append('formCase', 1)
      .append('formId', Admin_Object_FormId.Admin_GetAll_Object_REFUSE)
      .append('skipCount', 1)
      .append('maxResultCount', 10);
    this.params4 = new HttpParams()
      .append('type', BusinessType.CommerceGoods)
      .append('formCase', 1)
      .append('formId', Admin_Object_FormId.Admin_GetAll_Object_DISABLE)
      .append('skipCount', 1)
      .append('maxResultCount', 10);
  }
}
