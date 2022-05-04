import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleConst } from 'src/environments/constant';
import { Community } from 'src/model/community/Community';
import { DataResponse } from 'src/model/dataresponse';
import { BaseService } from '../base.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommunityService extends BaseService<Community> {

  constructor(
    private http: HttpClient,
    private injector: Injector
  )
  {
    super(http, injector);
  }
  getRevenueByTime(url: string, month:number, year:number): Observable<DataResponse> {
    let params = new HttpParams();
    params = params.append('month', month);
    params = params.append('year', year);
    return this.http.get<DataResponse>(this.BaseURL +url,{params:params})
        .pipe(catchError(err => this.handleError(err, this.injector)));
  }
}
