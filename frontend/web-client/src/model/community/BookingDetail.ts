export interface BookingDetailDto{
    bookingDetailId?:number;
    userId?:number;
    identityNumber?:string;
    phoneNumber?:string;
    fullName?:string;
    communityId?:number;
    serviceName?:string;
    startTime?:Date;
    endTime?:Date;
    total?:number;
    state?:number;
    creationTime?:Date;
}
export interface BookingRevenueDto{
    communityId?:number;
    serviceName?:string;
    totalBooks?:number;
    totalMoney?:number;
}