import { Component, OnInit } from '@angular/core';
import {SongService} from "../../service/song/song.service";
import {Song} from "../../model/Song";
declare var Amplitude: any;

@Component({
  selector: 'app-play-song',
  templateUrl: './play-song.component.html',
  styleUrls: ['./play-song.component.css']
})
export class PlaySongComponent implements OnInit {
  id: number;
  song: Song
  songList: Song[];
  constructor(private  songService: SongService) { }

  ngOnInit(): void {
    this.songService.getSongById(this.id).subscribe(res =>{
      this.song = res;
      Amplitude.init({
        songs: [
          {
            url: this.song.fileUrl,
            avt_url: this.song.avatarUrl
          }
        ],
      });
    });
  }

}
