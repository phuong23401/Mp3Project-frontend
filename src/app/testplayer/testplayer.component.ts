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
  audioList: AudioPlay[] = [];
  songList: Song[] = [];
  randomSong: Song;
  song :Array<object>=[];
  constructor(private songService: SongService) {
      this.songService.getAllSongs().subscribe(res => {
      this.songList = res;
      for(let i =0; i< res.length;i++){
        this.song[i] = {
          url: this.songList[i].fileUrl,
          title: this.songList[i].name,
          cover: this.songList[i].avatarUrl
        }
      }

    });
  }

  songs: any;

  ngOnInit(): void {

      console.log("song list", this.song)
  }

}
