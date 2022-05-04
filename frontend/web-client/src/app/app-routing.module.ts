import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleConst } from 'src/environments/constant';
import { LoginComponent } from './management/intro/login/login.component';
import { IntroComponent } from './management/intro/intro.component';

const routes: Routes = [
  {path:'', component:IntroComponent},
  {path:'intro', component:IntroComponent,},
  {path:'login', component:LoginComponent},
  {
    path: 'home',
    canActivate: [AuthGuard],
    data: { Role: [RoleConst.Admin,RoleConst.User] },
    loadChildren: () => import('./management/home/home.module').then(m => m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
