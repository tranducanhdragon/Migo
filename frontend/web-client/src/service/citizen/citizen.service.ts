import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Citizen } from 'src/model/citizen/Citizen';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class CitizenService extends BaseService<Citizen> {

  constructor(
    private http: HttpClient,
    private injector: Injector
  )
  {
    super(http, injector);
  }
  getByIdObservable(url: string, id: string): Observable<any> {
    const apiUrl = this.BaseURL+url + `/${id}`;
    return this.http.get<any>(apiUrl)
      .pipe(
        map((res:any) => {
          return res.data;
        }),
        catchError(err => this.handleError(err, this.injector)));
  }
}
