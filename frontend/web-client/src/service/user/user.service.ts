import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { RoleConst } from 'src/environments/constant';
import { User } from 'src/model/user/user';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {

  constructor(
    private http: HttpClient,
    private injector: Injector
  )
  {
    super(http, injector);
  }
}
