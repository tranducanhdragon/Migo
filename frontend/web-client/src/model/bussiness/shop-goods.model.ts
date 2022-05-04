export class ShopGoodsInfoDto {
    name: string;
    imageUrl: string;
    phoneNumber: string;
    address: string;
    detail: string;
    latitude: number = 0;
    longitude: number = 0;
    
    constructor() {
      this.name = '',
      this.address = '',
      this.imageUrl = '',
      this.detail = '',
      this.phoneNumber = ''
    }
  }
  
  export class OwnerGoodsInfoDto {
    fullName: string;
    email: string;
    phoneNumber : string;
    identityNumber: string;
    tax: string;
    imageBRC?: string;
    constructor() {
      this.fullName = '',
      this.email = '',
      this.phoneNumber = '',
      this.identityNumber = '',
      this.tax = '',
      this.imageBRC = ''
    }
  
  }


  export class WorkTimeGoodsDto {
      fromDayAWeek : string;
      toDayAWeek: string;
      fromHour : string;
      toHour: string;
      isFullTime: boolean;
      constructor() {
          this.fromDayAWeek = '2';
          this.toDayAWeek = '6';
          this.fromHour = '9 AM';
          this.toHour = '10 PM';
          this.isFullTime = false;
      }
  }


