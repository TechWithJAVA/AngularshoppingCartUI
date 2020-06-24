import { WelcomeComponent } from './Components/welcome/welcome.component';
import { AdminComponent } from './Components/admin/admin.component';
import { HomeComponent } from './Components/home/home.component';
import { RegisterComponent } from './Components/register/register.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';

const routes: Routes = [
  { path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'admin',
    component: AdminComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'home',
    component:HomeComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
