import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemsDto } from 'src/model/bussiness/object-data';
import { appModuleAnimation } from 'src/route-animation/animation';
import { BusinessService } from 'src/service/bussiness/business.service';
import { BusinessType, FormCase, Item_FormId, State_Object } from 'src/environments/AppEnums';
import { AllTypesProductService } from 'src/shared/observable-service/business/all-types-product.service';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss'],
  animations: [appModuleAnimation()],
})
export class BuyerComponent implements OnInit{

  constructor() {
  }

  ngOnInit(): void {
      
  }
}
