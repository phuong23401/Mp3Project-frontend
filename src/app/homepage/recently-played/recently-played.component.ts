import { Component, OnInit } from '@angular/core';
import {SongService} from "../../service/song/song.service";
import {Song} from "../../model/Song";

@Component({
  selector: 'app-recently-played',
  templateUrl: './recently-played.component.html',
  styleUrls: ['./recently-played.component.scss']
})
export class RecentlyPlayedComponent implements OnInit {
  songList: Song[];
  isPlaying: boolean;
  constructor(private songService: SongService,
              ) { }

  ngOnInit(): void {
    this.isPlaying = false;
    this.songService.getAllSongs().subscribe(res =>{
      this.songList = res;
    })
  }

  play() {
    this.isPlaying = true;
  }
}
