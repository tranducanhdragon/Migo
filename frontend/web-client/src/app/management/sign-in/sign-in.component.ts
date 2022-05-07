import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/service/user/user.service';

enum SigninSwitch {
  Login = 1,
  Register = 2
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
    private userService: UserService) { }

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
      if (res.success) {
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
}
