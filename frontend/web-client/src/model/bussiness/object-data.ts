
export interface IObjectPartnerDto {}

export class ObjectPartnerDto implements IObjectPartnerDto {
  storeObjectId?: number
  userId?:number
  storeType?: number
  properties?: string
  name?: string
  owner?: string
  state?:number
  like?: number
}

export class ItemsDto {
  storeItemId?: number
  properties?: any
  storeObjectId?: number
  quantity?: number
  price?: number
  like?: number
  numberOrder?: number
  type?: number
  state?: number
  queryKey?: string
  typeGoods?: number
  category?: string
  name?:string
  constructor(data?: any) {
    if (data) {
      for (var property in data) {
        if (data?.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property]
      }
    }
  }
  init(data?: any) {
    if (data) {
      this.storeItemId = data['storeItemId']
      this.type = data['type']
      this.properties = data['properties']
      this.queryKey = data['queryKey']
      this.storeObjectId = data['storeObjectId']
      this.price = data['price']
      this.quantity = data['quantity']
      this.like = data['like']
      this.numberOrder = data['numberOrder']
      this.name = data['name']
    }
  }
}

export class IItemTypeDto {
  id?: number
  name?: string
  required?: boolean
  type?: number
  inputType?: number
  value?: string
  listUnit?: any
  properties?: string
  queryKey?: string
}

export class ItemTypeDto implements IItemTypeDto {
  id?: number
  name?: string
  required?: boolean
  type?: number
  inputType?: number
  value?: string
  listUnit?: any
  properties?: any
  queryKey?: string

  constructor(data?: IItemTypeDto, key?: string) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property]
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.id = data['id']
      this.name = data['name']
      this.required = data['required']
      this.type = data['type']
      this.inputType = data['inputType']
      this.listUnit = data['listUnit']
      this.properties = data['properties']
      this.value = data['value']
      this.queryKey = data['queryKey']
    }
  }
}

export class IItemViewDto {
  id?: number
  type?: number
  properties?: any
}
export class ItemViewDto implements IItemViewDto {
  id?: number
  type?: number
  properties: any

  constructor(data?: any) {
    if (data) {
      ;(this.id = data?.id),
        (this.type = data?.type),
        (this.properties = JSON.stringify(data?.properties))
    }
  }
  init(data?: any) {
    if (data) {
      this.id = data['id']
      this.type = data['type']
      this.properties = data['properties']
    }
  }
}

export class TreeNodeDto<T = any> {
  label?: string
  data?: T
  icon?: string
  children?: TreeNodeDto<T>[]
  type?: string

  constructor(data?: any) {
    if (data) {
      this.label = data?.label
      this.type = data?.type
      this.data = data?.data
      this.icon = data?.icon
      this.children = []
      if (data?.children) {
        for (var child in data?.children) {
          this.children.push(new TreeNodeDto<T>(data?.children[child]))
        }
      }
    }
  }
}

export class OrderDto {
  id?: number
  items?: string
  storeObjectId?: number
  ordererId?: number
  orderer?: string
  properties?:any
  type?:number
  state?:number
  storeItemId?:number
  quantity?:number=1
  totalPrice?:number
  orderDate?:Date

  constructor(data?: any) {
    if (data) {
      this.id = data?.id
      this.items = data?.items
      this.storeObjectId = data?.storeObjectId
      this.ordererId = data?.ordererId
      this.orderer = data?.orderer
      this.properties = JSON.stringify(data?.properties)
      this.type = data?.type
      this.state = data?.state
      this.storeItemId = data?.storeItemId
      this.quantity = data?.quantity
      this.totalPrice = data?.totalPrice
      this.orderDate = data?.orderDate
    }
  }
  init(data?: any) {
    if (data) {
      this.id = data['id']
      this.items = data['items']
      this.storeObjectId = data['storeObjectId']
      this.ordererId = data['ordererId']
      this.orderer = data['orderer']
      this.properties = data['properties']
      this.type = data['type']
      this.state = data['state']
      this.storeItemId = data['storeItemId']
      this.quantity = data['quantity']
      this.totalPrice = data['totalPrice']
      this.orderDate = data['orderDate']
    }
  }
}

export class SetItemsDto {
  id?: number
  name?: string
  properties?: string
  items?: string
}

export class VoucherDto {
  id?: number
  name?: string
  description?: string
  code?: number
  objectPartnerId?: number
}

export class BusinessNotifyDto {
  id?: number
  message?: string
  from?: string
  to?: string
}

export class ItemViewSettingDto {
  id?: number
  type?: number
  properties?: any
}

export class ShopInfo {
  name?: string
  imageUrl?: string
  phoneNumber?: number
  city?: string
  district?: string
  ward?: string
  address?: string
  fullAddress?: string
  detail?: string
}

export class OwnerInfo {
  fullName?: string
  email?: string
  phoneNumber?: number
  identityNumber?: string
  tax?: string
  businessLicence?: string
}

export class RateDto {
  itemId?: number
  objectId?: number
  ratePoint?: number
  comment?: string
  email?: string
  userName?: string
  isItemReview?: boolean
  item?: any

  constructor(data?: any) {
    this.itemId = data?.itemId
    this.objectId = data?.objectId
    this.ratePoint = data?.ratePoint
    this.comment = data?.comment
    this.email = data?.email
    this.userName = data?.userName
  }
}

export interface Review {
    id?: number;
    comment?: string;
    answerd?: Review;
    answerRateId?:number;
    creationTime?: Date;
    email?: string;
    userName?: string;
    item?: any;
    isItemReview?: boolean;
    ratePoint?: number;
    hasAnswered?: boolean;
  }