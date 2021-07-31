import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { PlaymusicComponent } from './share/audio/playmusic/playmusic.component';
import { SidemenuComponent } from './share/sidemenu/sidemenu/sidemenu.component';
import { SongComponent } from './song/song.component';
import { CreatesongComponent } from './createsong/createsong.component';
import {UploadImgComponent} from "./uploadfile/upload-img/upload-img.component";
import { UploadUrlComponent} from "./uploadfile/upload-url/upload-url.component";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomepageComponent,
    SongComponent,
    CreatesongComponent,
    ProfileComponent,
    PlaymusicComponent,
    SidemenuComponent,
    UploadImgComponent,
    UploadUrlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
