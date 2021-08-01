import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './profile/profile.component';
import { CreatesongComponent } from "./song/createsong/createsong.component";
import { UploadImgComponent } from "./uploadfile/upload-img/upload-img.component";
import { UploadUrlComponent } from "./uploadfile/upload-url/upload-url.component";
import {ListSongSearchComponent} from "./song/list-song-search/list-song-search.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomepageComponent },
  { path: 'updateProfile', component: ProfileComponent },
  { path: 'createsong', component: CreatesongComponent },
  { path: 'img', component: UploadImgComponent },
  { path: 'url', component: UploadUrlComponent },
  { path: 'search', component: ListSongSearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
