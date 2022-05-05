import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleConst } from 'src/environments/constant';
import { Tour } from 'src/model/tour/tour';
import { DataResponse } from 'src/model/dataresponse';
import { BaseService } from '../base.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TourService extends BaseService<Tour> {
  constructor(
    private http: HttpClient,
    private injector: Injector
  )
  {
    super(http, injector);
  }
}
