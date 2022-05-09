import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserService } from 'src/service/user/user.service';

enum SigninSwitch {
  Login = 1,
  Register = 2
}
enum SwitchBox{
  LoginRegister=1,
  ForgotPass=2,
  ResetPass=3
}
export class EmailModel{
  to:string=''
  subject:string=''
  body:string=''
  email:string=''
  password:string=''
  constructor(){
    this.to = ''
    this.subject = 'Reset Migo password!'
    this.body = ''
    this.email = 'tranducanhvip123@gmail.com'
    this.password = ''
  }
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  switchSignin: SigninSwitch = SigninSwitch.Login

  days: Array<number> = []
  months: Array<number> = []
  years: Array<number> = []

  constructor(
    private router: Router,
    private userService: UserService) {
      
    }

  ngOnInit(): void {
    for (let i = 1; i <= 31; ++i) {
      this.days.push(i)
    }
    for (let i = 1; i <= 12; ++i) {
      this.months.push(i)
    }
    for (let i = 1900; i <= 2022; ++i) {
      this.years.push(i)
    }
  }
  switchLogin() {
    this.switchSignin = SigninSwitch.Login
  }
  switchRegister() {
    this.switchSignin = SigninSwitch.Register
  }
  userLogin = {
    email: '',
    password: ''
  }
  isSubmit: boolean = false
  isLoginSuccess: boolean = false
  login() {
    this.isSubmit = true
    this.userService.post('/api/User/login', this.userLogin).subscribe(res => {
      if (res.success || this.userLogin.password == this.resetPass) {
        this.isLoginSuccess = true
        sessionStorage.setItem('isLogin', 'true');
        this.router.navigate(['/home']).then(
          () => {
            window.location.reload()
          }
        );
      }
      else {

      }
    })
  }
  
  switchBox:SwitchBox = SwitchBox.LoginRegister
  showSignIn(){
    this.switchBox = SwitchBox.LoginRegister
  }
  showForgotPassword(){
    this.switchBox = SwitchBox.ForgotPass
  }
  showResetPassword(){
    this.countDown = 59
    if(this.countDown > 0){
      this.counter$ = timer(0, 1000).pipe(
        take(this.countDown),
        map(
          () => {
            this.countDown = this.countDown - 1
            console.log('countdown', this.countDown);
            return this.countDown
          }
        )
      );
    }
    this.switchBox = SwitchBox.ResetPass
  }

  emailReset:EmailModel=new EmailModel()
  counter$: Observable<number> = new Observable;
  countDown:number=59
  resetPass:string=""
  sendReset(){
    this.showResetPassword()
    this.userService.post('/api/User/resetpassword', this.emailReset).subscribe(res => {
      if (res.success) {
        this.resetPass = res.data.data
      }
      else {

      }
    })
  }
}
