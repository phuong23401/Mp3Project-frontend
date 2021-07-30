import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongComponent } from './song/song.component';
import { CreatesongComponent } from './createsong/createsong.component';

@NgModule({
  declarations: [
    AppComponent,
    SongComponent,
    CreatesongComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
