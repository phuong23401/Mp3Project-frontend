import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Audio} from "../audio/audio.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  album: Audio[] = [];
  dataSource = new BehaviorSubject<any>('truyền dữ liệu mp3');
  currentData= this.dataSource.asObservable();
  // lay ra tu search
  keyWordSource = new BehaviorSubject<string>('truyền key word');
  keyWord = this.keyWordSource.asObservable();
  // lay ra playlist
  albumSourse = new BehaviorSubject<Audio[]>(this.album);
  currentAlbum = this.albumSourse.asObservable();
  // thêm bài hát vào album
  addSongToAlbumSourse = new BehaviorSubject<any>('');
  currentSongAdd = this.addSongToAlbumSourse.asObservable();


  constructor() { }
}
