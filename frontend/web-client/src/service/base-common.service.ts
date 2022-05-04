import {
  HttpClient,
} from '@angular/common/http'
import { Inject, InjectionToken, Injector, Optional } from '@angular/core'
import { Injectable } from '@angular/core'
import { catchError, map } from 'rxjs/operators'
import { DataResponse } from '../model/dataresponse';
import {
  Observable,
  throwError as _observableThrow,
  of as _observableOf,
} from 'rxjs'

import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch,
} from 'rxjs/operators'

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL')

@Injectable()
export abstract class BaseCommonService {
  http: HttpClient
  //baseUrl: string;
  baseUrl = 'http://localhost:44366'
  constructor(
    injector: Injector
    // @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.http = injector.get(HttpClient)
    //this.baseUrl = baseUrl ? baseUrl : "";
  }

  public getAllData(url: string, params?: any): Observable<any> {
    return this.http
      .get<DataResponse>(this.baseUrl + url, { params: params })
      .pipe(
        catchError((err) => {
          console.log('error ', err)
          return err
        }),
      )
  }

  public getAllDataAsync(url: string, params?: any): Observable<any> {
    return this.http
      .get<DataResponse>(this.baseUrl + url, { params: params })
      .pipe(
        map((res: any) => {
          return res.result.data
        }),
        catchError((err) => {
          console.log('error ', err)
          return err
        }),
      )
  }

  public uploadImagePublic(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/uploadfile', data).pipe(
      map((res: any) => {
        return res
      }),
      catchError((err) => {
        console.log('error ', err)
        return err
      }),
    )
  }

  public getById(id: number, url: string): Observable<any> {
    return this.http.get<DataResponse>(this.baseUrl + url + `?id=${id}`).pipe(
      map((res: any) => {
        return res
      }),
      catchError((err) => {
        console.log('error ', err)
        return err
      }),
    )
  }

  public getByIdAsync(id: number, url: string): Observable<any> {
    return this.http.get<DataResponse>(this.baseUrl + url + `?id=${id}`).pipe(
      map((res: any) => {
        res.result.data.creationTime = new Date(res.result.data.creationTime)
        return res.result.data
      }),
      catchError((err) => {
        console.log('error ', err)
        return err
      }),
    )
  }

  public getByCode(code: string, url: string): Observable<any> {
    return this.http
      .get<DataResponse>(this.baseUrl + url + `?code=${code}`)
      .pipe(
        map((res: any) => {
          return res.result
        }),
        catchError((err) => {
          console.log('error ', err)
          return err
        }),
      )
  }

  public create(url: string, object: any): Observable<any> {
    return this.http.post(this.baseUrl + url, object).pipe(
      map((res: any) => {
        return res
      }),
      catchError((err) => {
        console.log(err)
        return err
      }),
    )
  }

  public put(url: string, object: any): Observable<any> {
    return this.http.put(this.baseUrl + url, object).pipe(
      map((res: any) => {
        return res
      }),
      catchError((err) => {
        console.log(err)
        return err
      }),
    )
  }

  public search(text: string, url: string): Observable<any> {
    var data = { data: text }
    return this.http.post(this.baseUrl + url, data).pipe(
      map((res: any) => {
        return res
      }),
      catchError((err) => {
        console.log('error ', err)
        return err
      }),
    )
  }

  public deleteById(id: number, url: string): Observable<any> {
    return this.http.delete(this.baseUrl + url + `${id}`).pipe(
      map((res: any) => {
        return res
      }),
      catchError((err) => {
        console.log('error ', err)
        return err
      }),
    )
  }
}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!blob) {
      observer.next('')
      observer.complete()
    } else {
      let reader = new FileReader()
      reader.onload = (event) => {
        observer.next((<any>event.target).result)
        observer.complete()
      }
      reader.readAsText(blob)
    }
  })
}
