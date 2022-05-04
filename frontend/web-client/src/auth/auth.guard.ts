import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/service/user/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private userService: UserService) {
    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean 
    {
        let token = localStorage.getItem('token');
        if(token){
            const payLoad = JSON.parse(window.atob(token.split('.')[1])),
                  roles = next.data.Role as Array<Number>;
            
            if(payLoad && roles.includes(+payLoad.RoleId)){
                return true;
            }
            else{//if this user is not authorized
                return false;
            }
        }
        this.router.navigate(['/login']);
        return false;
    }
}
