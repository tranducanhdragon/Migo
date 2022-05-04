import { Gender, Job } from "src/environments/constant";

export interface Citizen{
    citizenId?:number;
    citizenName?:string;
    urlImage?:string;
    identityNumber?:string;
    dateOfBirth?:Date;
    address?:string;
    gender?:number;
    job?:number;
    userId?:number
}
