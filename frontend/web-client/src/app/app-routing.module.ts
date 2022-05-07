import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleConst } from 'src/environments/constant';
import { CommunityComponent } from './management/community/community.component';
import { DestinationComponent } from './management/destination/destination.component';
import { HomeComponent } from './management/home/home.component';
import { SignInComponent } from './management/sign-in/sign-in.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'community', component:CommunityComponent,},
  {path:'destination', component:DestinationComponent,},
  {path:'signin', component:SignInComponent,},
  {
    path: 'home',
    loadChildren: () => import('./management/home/home.module').then(m => m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
