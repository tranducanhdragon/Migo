import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleConst } from 'src/environments/constant';
import { AdminBusinessComponent } from './admin-business.component';

const routes: Routes = [
    {
      path: '',component: AdminBusinessComponent,
      children: [
        
      ],
      canActivate: [AuthGuard],
      data: { Role: [RoleConst.Admin, RoleConst.User] },
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminBusinessRoutingModule { }