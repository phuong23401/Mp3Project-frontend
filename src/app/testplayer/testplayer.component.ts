import {Component, OnInit} from '@angular/core';
import {SongService} from "../service/song/song.service";
import {Song} from "../model/Song";
import {AudioPlay} from "../model/AudioPlay";

@Component({
  selector: 'app-testplayer',
  templateUrl: './testplayer.component.html',
  styleUrls: ['./testplayer.component.css']
})
export class TestplayerComponent implements OnInit {
  audioList: AudioPlay[] = [];
  songList: Song[] = [];
  randomSong: Song;

  constructor(private songService: SongService) {

  }

  songs: any;

  ngOnInit(): void {
    this.songService.getAllSongs().subscribe(res => {
      this.songList = res;
      this.randomSong = this.songList[Math.floor(Math.random() * this.songList.length)]
    });
    this.setAudio();
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
// console.log(this.randomSong.fileUrl)
    this.audioList = [
      {
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        title: "Smaple 1",
        cover: "https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg"
      },
      {
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        title: "Sample 2",
        cover: "https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg"
      },
      {
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
        title: "Sample 3",
        cover: "https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg"
      }
    ];
  }
}
