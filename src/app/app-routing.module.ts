import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './profile/profile.component';
import {CreatesongComponent} from "./createsong/createsong.component";
import {UploadImgComponent} from "./uploadfile/upload-img/upload-img.component";
import {UploadUrlComponent} from "./uploadfile/upload-url/upload-url.component";

const routes: Routes = [
  {path: '', component:HomepageComponent},
  {path: 'updateProfile', component:ProfileComponent},
  {path:'createsong',component:CreatesongComponent},
  {path:'img',component:UploadImgComponent},
  {path:'url',component:UploadUrlComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
