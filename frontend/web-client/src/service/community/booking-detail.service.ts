import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { RoleConst } from 'src/environments/constant';
import { BookingDetailDto } from 'src/model/community/BookingDetail';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class BookingDetailService extends BaseService<BookingDetailDto> {

  constructor(
    private http: HttpClient,
    private injector: Injector
  )
  {
    super(http, injector);
  }
}
