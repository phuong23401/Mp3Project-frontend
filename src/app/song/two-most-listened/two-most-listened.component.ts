import { Component, OnInit } from '@angular/core';
import { Song } from '../../model/Song';
import { SongService } from '../../service/song/song.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-two-most-listened',
  templateUrl: './two-most-listened.component.html',
  styleUrls: ['./two-most-listened.component.css'],
})
export class TwoMostListenedComponent implements OnInit {
  songList: Song[] = [];
  isPlaying = false;
  i = 0;
  song: Song;
  songs: Song[];
  msbapDisplayTitle = false;
  msbapDisplayVolumeControls = true;
  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapDisplayVolumeControls = true;
  likeCounter = 0;
  checkPause = 0;
  listenCounter = 0;
  id: any;
  audio: any;

  constructor(private songService: SongService, private router: Router) {}

  ngOnInit(): void {
    this.topSongsView();
  }

  topSongsView(): any {
    this.isPlaying = false;
    this.songService.topSongsView().subscribe((songList) => {
      this.songList = songList;
    });
  }

  listenCount(song: Song) {
    this.isPlaying = !this.isPlaying;
    this.audio = new Audio();
    this.audio.src = song.fileUrl;
    this.audio.load();
    this.audio.play();
    this.songService.getListenSongById(song.id).subscribe((data) => {
      this.song = data;
      this.songService.topSongsView().subscribe((songList) => {
        this.songList = songList;
      });
    });
  }

  changePause() {
    this.isPlaying = !this.isPlaying;
    this.audio.pause();
  }
}
