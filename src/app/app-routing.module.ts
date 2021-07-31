import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import {CreatesongComponent} from "./createsong/createsong.component";

const routes: Routes = [
  {path: 'signup', component:SignupComponent},
  {path: 'signin', component:SigninComponent},
  {path: '', component:HomepageComponent},
  {path:'createsong',component:CreatesongComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
