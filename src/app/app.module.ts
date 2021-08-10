import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { SidemenuComponent } from './share/sidemenu/sidemenu/sidemenu.component';
import { SongComponent } from './song/song-manager/song.component';
import { CreatesongComponent } from './song/createsong/createsong.component';
import { UploadImgComponent } from './uploadfile/upload-img/upload-img.component';
import { UploadUrlComponent } from './uploadfile/upload-url/upload-url.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { HeaderComponent } from './share/headerr/header/header.component';
import { FooterComponent } from './share/footer/footer.component';
import { PlayerComponent } from './share/player/player.component';
import { RecentlyPlayedComponent } from './homepage/recently-played/recently-played.component';
import { WeeklyTopComponent } from './homepage/weekly-top/weekly-top.component';
import { FeaturedArtistsComponent } from './homepage/featured-artists/featured-artists.component';
import { NewReleaseComponent } from './homepage/new-release/new-release.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoginDialogComponent } from './share/login-dialog/login-dialog.component';
import { ListSongSearchComponent } from './song/list-song-search/list-song-search.component';
import { RegisterDialogComponent } from './share/register-dialog/register-dialog.component';
import { Header1Component } from './share/headerr/header1/header1.component';
import { TwoMostListenedComponent } from './song/two-most-listened/two-most-listened.component';
import { ChangepasswordComponent } from './profile/changepassword/changepassword.component';
import { httpInterceptorProviders } from './service/auth/auth.interceptor';
import { SearchfilterPipe } from './share/searchfilter.pipe';
import { PlaySongComponent } from './song/play-song/play-song.component';
import { CommonModule } from '@angular/common';
import { UpdateSongComponent } from './song/update-song/update-song.component';
import { TopListenedPlaylistComponent } from './playlist/top-listened-playlist/top-listened-playlist.component';
import { MyplaylistComponent } from './myplaylist/myplaylist.component';
import { PlaylistdetailsComponent } from './myplaylist/playlistdetails/playlistdetails.component';
import { CreatepPlaylistComponent } from './myplaylist/createp-playlist/createp-playlist.component';
import { CommentComponent } from './share/comment/comment-song/comment.component';
import { DetailSongComponent } from './song/detail-song/detail-song.component';
import { CommentPlayListComponent } from './share/comment/comment-play-list/comment-play-list.component';
import { AddSongDialogComponent } from './share/add-song-dialog/add-song-dialog.component';
import { TestplayerComponent } from './testplayer/testplayer.component';
import { AngMusicPlayerModule } from 'ang-music-player';
import { LatestPlaylistComponent } from './playlist/latest-playlist/latest-playlist.component';
import { TopLikePlaylistComponent } from './playlist/top-like-playlist/top-like-playlist.component';
import { TopLikeSongsComponent } from './song/top-like-songs/top-like-songs.component';
import { ToastGlobalComponent } from './share/toast-global/toast-global.component';
import { ToastContainerComponent } from './share/toast-container/toast-container.component';
import { SingerComponent } from './singer/singer.component';
import { ComentPlaylistAthomeComponent } from './playlist/coment-playlist-athome/coment-playlist-athome.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    SongComponent,
    CreatesongComponent,
    ProfileComponent,
    SidemenuComponent,
    UploadImgComponent,
    UploadUrlComponent,
    HeaderComponent,
    FooterComponent,
    PlayerComponent,
    RecentlyPlayedComponent,
    WeeklyTopComponent,
    FeaturedArtistsComponent,
    NewReleaseComponent,
    LoginDialogComponent,
    ListSongSearchComponent,
    RegisterDialogComponent,
    Header1Component,
    TwoMostListenedComponent,
    ChangepasswordComponent,
    SearchfilterPipe,
    PlayerComponent,
    PlaySongComponent,
    UpdateSongComponent,
    TopListenedPlaylistComponent,
    MyplaylistComponent,
    PlaylistdetailsComponent,
    CreatepPlaylistComponent,
    UpdateSongComponent,
    CommentComponent,
    DetailSongComponent,
    TestplayerComponent,
    CommentPlayListComponent,
    AddSongDialogComponent,
    LatestPlaylistComponent,
    TopLikePlaylistComponent,
    TopLikeSongsComponent,
    ToastContainerComponent,
    ToastGlobalComponent,
    SingerComponent,
    ComentPlaylistAthomeComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    AngMusicPlayerModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
