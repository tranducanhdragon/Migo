import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'web-client';
  currentYear: number = new Date().getFullYear();

  menuItem=[
    {title:"Home", isActive:true, href:"home"},
    {title:"Community", isActive:false, href:"community"},
    {title:"Destination", isActive:false, href:"destination"}
  ]
  constructor(
    private router:Router
  ){

  }
  ngOnInit(): void {
    this.getUserSession()
  }
  isLogin:boolean=false
  getUserSession(){
    let userSessionValue = sessionStorage.getItem('isLogin')
    if(userSessionValue == 'true'){
      this.isLogin = true
    }
    else{
      this.isLogin = false
    }
  }
  chooseItemMenu(item:any){
    this.menuItem.forEach(it => {
      it.isActive = false
    })
    item.isActive = !item.isActive
  }

  isShowUserTool:boolean=false
  showUserTool(){
    this.isShowUserTool = !this.isShowUserTool
  }
  logout(){
    sessionStorage.clear()
    this.router.navigate(['/signin']).then(
      () => {
        window.location.reload()
      }
    )
  }
}
