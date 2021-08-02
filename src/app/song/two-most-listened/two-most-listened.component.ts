import { Component, OnInit } from '@angular/core';
import {Song} from "../../model/Song";
import {SongService} from "../../service/song/song.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-two-most-listened',
  templateUrl: './two-most-listened.component.html',
  styleUrls: ['./two-most-listened.component.css']
})
export class TwoMostListenedComponent implements OnInit {
  isPlaying: boolean;
  songList: Song[] = [];
  constructor(private songService: SongService, private router: Router) { }

  ngOnInit(): void {
    this.topSongsView();
  }
  topSongsView(): any {
    this.isPlaying = false;
    this.songService.topSongsView().subscribe(songList => {
      this.songList = songList;
    });
  }
  play() {
    this.isPlaying = true;
  }

}
