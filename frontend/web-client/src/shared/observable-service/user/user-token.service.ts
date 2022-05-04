import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserTokenService {
  userId:number=0
  constructor(){ 
    
  }
  getUserToken(){
    let token = localStorage.getItem('token');
    if(token){
      const payLoad = JSON.parse(window.atob(token.split('.')[1]));
      this.userId = +payLoad.UserId;
    } 
    return this.userId
  }
}