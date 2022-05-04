import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleConst } from 'src/environments/constant';
import { CitizenChatComponent } from './citizen-chat/citizen-chat.component';
import { CitizenInforComponent } from './citizen-infor/citizen-infor.component';
import { CitizenMenuComponent } from './citizen-menu/citizen-menu.component';
import { CitizenComponent } from './citizen.component';

const routes: Routes = [
    {
      path: '',component: CitizenComponent,
      children: [
        { 
          path: 'citizen-menu',
          canActivate: [AuthGuard],
          data: { Role: [RoleConst.Admin, RoleConst.User] },
          component: CitizenMenuComponent 
        },
        { 
          path: 'citizen-infor',
          canActivate: [AuthGuard],
          data: { Role: [RoleConst.Admin] },
          component: CitizenInforComponent 
        },
        { 
          path: 'citizen-chat',
          canActivate: [AuthGuard],
          data: { Role: [RoleConst.Admin, RoleConst.User] },
          component: CitizenChatComponent 
        },
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitizenRoutingModule { }