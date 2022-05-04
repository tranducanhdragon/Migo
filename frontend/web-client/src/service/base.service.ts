import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DataResponse } from '../model/dataresponse';

@Injectable()
export  class BaseService<T> {
    BaseURL = 'http://localhost:44366';
    constructor(
        private _http: HttpClient,
        private _injector: Injector)
    {

    }

    post(url: string, item: T): Observable<DataResponse> {

        return this._http.post<DataResponse>(this.BaseURL+url, item)
            .pipe(catchError(err => this.handleError(err, this._injector)));
    }

    getAllData(url: string): Observable<DataResponse> {
        return this._http.get<DataResponse>(this.BaseURL+url)
            .pipe(catchError(err => this.handleError(err, this._injector)));
    }

    public getAllDataFilter(url: string, params?: any): Observable<any> {
        return this._http
          .get<DataResponse>(this.BaseURL + url, { params: params })
          .pipe(
            catchError((err) => {
              console.log('error ', err)
              return err
            }),
          )
    }

    getById(url: string, id: string): Observable<DataResponse> {
        const apiUrl = this.BaseURL+url + `/${id}`;
        return this._http.get<DataResponse>(apiUrl)
            .pipe(catchError(err => this.handleError(err, this._injector)));
    }
    
    put(url: string, item: T): Observable<DataResponse> {

        return this._http.put<DataResponse>(this.BaseURL+url, item)
            .pipe(catchError(err => this.handleError(err, this._injector)));
    }

    delete(url: string, item: T): Observable<DataResponse> {
        const apiUrl = this.BaseURL+url;
        return this._http.delete<DataResponse>(apiUrl,
            {
                body:item,
            })
            .pipe(catchError(err => this.handleError(err, this._injector)));

    }

    deleteMany(url: string, listId: any): Observable<DataResponse> {
        const apiUrl = this.BaseURL+url + `/deletemany`;
        return this._http.put<DataResponse>(apiUrl, listId)
            .pipe(catchError(err => this.handleError(err, this._injector)));
    }

    public uploadImage(data: any): Observable<any> {
        return this._http.post(this.BaseURL + "/uploadfile", data)
            .pipe(
                map((res: any) => {
                    return res;
                }),
                catchError(err => this.handleError(err, this._injector))
            );
    }

    async handleError(error: any, injector: Injector) {
        console.error('Có lỗi xảy ra', error);
        return Promise.reject(error);
    }
}