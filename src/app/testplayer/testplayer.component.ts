import { AudioPlay } from './../model/AudioPlay';
import {Component, OnInit} from '@angular/core';
import {SongService} from "../service/song/song.service";
import {Song} from "../model/Song";
declare var music: any;
@Component({
  selector: 'app-testplayer',
  templateUrl: './testplayer.component.html',
  styleUrls: ['./testplayer.component.css']
})
export class TestplayerComponent implements OnInit {
  // audioList: AudioPlay[] = [];
  songList: Song[] = [];
  randomSong: Song;

  constructor(private songService: SongService) {


  }

  songs: any;

  ngOnInit(): void {
    this.songService.getAllSongs().subscribe(res => {
      this.songList = res;
      // this.randomSong = this.songList[Math.floor(Math.random() * this.songList.length)]
      console.log("song list ",this.songList)
      console.log("song url ",this.randomSong.fileUrl)
      // this.audioList = res
      // this.songList = this.audioList

    });

  }


  setAudio() {
    // for (let i = 0; i < this.songList.length; i++) {
    //   let music: AudioPlay = {
    //     url: this.songList[i].fileUrl,
    //     title: this.songList[i].name,
    //     cover: this.songList[i].avatarUrl
    //   }
    //   this.audioList.push(music);
    // }
    // console.log(this.audioList);


    // console.log("list au diooooo",this.audioList);


  }
}
