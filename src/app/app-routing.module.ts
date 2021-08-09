import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './profile/profile.component';
import { CreatesongComponent } from "./song/createsong/createsong.component";
import { UploadImgComponent } from "./uploadfile/upload-img/upload-img.component";
import { UploadUrlComponent } from "./uploadfile/upload-url/upload-url.component";
import {ListSongSearchComponent} from "./song/list-song-search/list-song-search.component";
import {ChangepasswordComponent} from "./profile/changepassword/changepassword.component";
import {SongComponent} from "./song/song-manager/song.component";
import {UpdateSongComponent} from "./song/update-song/update-song.component";
import {DetailSongComponent} from "./song/detail-song/detail-song.component";
import {MyplaylistComponent} from "./myplaylist/myplaylist.component";
import {PlaylistdetailsComponent} from "./myplaylist/playlistdetails/playlistdetails.component";
import {CreatepPlaylistComponent} from "./myplaylist/createp-playlist/createp-playlist.component";
import {TestplayerComponent} from "./testplayer/testplayer.component";
import { ToastGlobalComponent } from './share/toast-global/toast-global.component';
import {ToastContainerComponent} from "./share/toast-container/toast-container.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomepageComponent },
  { path: 'updateProfile', component: ProfileComponent },
  { path: 'createsong', component: CreatesongComponent },
  { path: 'img', component: UploadImgComponent },
  { path: 'url', component: UploadUrlComponent },
  { path: 'search', component: ListSongSearchComponent },
  { path: 'song/:id', component: DetailSongComponent  },
  { path: 'changepassword', component: ChangepasswordComponent},
  { path: 'song', component: SongComponent},
  { path: 'updatesong/:id', component: UpdateSongComponent},
  { path: 'myplaylist', component: MyplaylistComponent},
  { path: 'myplaylist/details/:id', component: PlaylistdetailsComponent},
  { path: 'createplaylist', component: CreatepPlaylistComponent},
  { path: 'check', component: TestplayerComponent},
  { path: 'test', component: ToastContainerComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
