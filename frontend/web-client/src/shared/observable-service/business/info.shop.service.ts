import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable()
export class InfoShopService {
  private shopInfo = new BehaviorSubject(null)
  curentInforShop = this.shopInfo.asObservable()
  private ownerInfo = new BehaviorSubject(null)
  curentInforOwner = this.ownerInfo.asObservable()
  private workTime = new BehaviorSubject(null)
  curentWorkTime = this.workTime.asObservable()

  private locationMap = new BehaviorSubject({})
  currentLocationMap = this.locationMap.asObservable()

  constructor() {}

  changeShop(data: any) {
    this.shopInfo.next(data)
  }

  changeOwner(data: any) {
    this.ownerInfo.next(data)
  }

  changeWorkTime(data: any) {
    this.workTime.next(data)
  }

  changeLocationMap(data: any) {
    this.locationMap.next(data)
  }
}
