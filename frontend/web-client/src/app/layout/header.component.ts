import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { User } from 'src/model/user/user';
import { UserService } from 'src/service/user/user.service';
import { UserTokenService } from 'src/shared/observable-service/user/user-token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  user:User={};
  activeItem = [
    {
      name:'community',
      value:true
    },
    {
      name:'citizen',
      value:false
    },
    {
      name:'business',
      value:false
    },
    {
      name:'seller',
      value:false
    },
    {
      name:'buyer',
      value:false
    }
  ]
  
  constructor(
    private router: Router,
    private userTokenService:UserTokenService,
    private userService:UserService)
  {}
  ngOnInit(): void {
    let userId = this.userTokenService.getUserToken()
    this.getUserInfor(userId.toString())
  }

  userInfor:Observable<any> = new Observable
  getUserInfor(userId:string){
    this.userInfor = this.userService.getById('/api/User/getbyid', userId).pipe(
      map(
        res => {
          if(res.success){
            console.log('userInfor', res.data);
            return res.data; 
          }
        }
      )
    )
  }
  itemActive(index:number){
    //reset all item
    this.activeItem.forEach(it => {
      it.value = false
    })
    //active item
    this.activeItem[index].value = !this.activeItem[index].value
  }
  logout(){
    localStorage.removeItem("token");
    let user:any;
    this.userService.post("/api/User/logout", user).subscribe(
      (res:any)=>{
        this.router.navigate(['/login']);
      }
    )
  }
}
