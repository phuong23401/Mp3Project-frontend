import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { PlaymusicComponent } from './share/audio/playmusic/playmusic.component';
import { SidemenuComponent } from './share/sidemenu/sidemenu/sidemenu.component';
import { SongComponent } from './song/song-manager/song.component';
import { CreatesongComponent } from './song/createsong/createsong.component';
import { UploadImgComponent } from "./uploadfile/upload-img/upload-img.component";
import { UploadUrlComponent } from "./uploadfile/upload-url/upload-url.component";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
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
import { ListNewSongComponent } from './song/list-new-song/list-new-song.component';
import { TwoMostListenedComponent } from './song/two-most-listened/two-most-listened.component';
import { ChangepasswordComponent} from "./profile/changepassword/changepassword.component";
import {httpInterceptorProviders} from "./service/auth/auth.interceptor";
import { PlayMysongComponent } from './song/song-manager/play-mysong/play-mysong.component';
import { SearchfilterPipe } from './share/searchfilter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    SongComponent,
    CreatesongComponent,
    ProfileComponent,
    PlaymusicComponent,
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
    ListNewSongComponent,
    TwoMostListenedComponent,
    ChangepasswordComponent,
    PlayMysongComponent,
    SearchfilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    ModalModule.forRoot()
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
