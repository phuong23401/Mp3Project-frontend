import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/model/Song';
import { SongService } from 'src/app/service/song/song.service';

@Component({
  selector: 'app-top-like-songs',
  templateUrl: './top-like-songs.component.html',
  styleUrls: ['./top-like-songs.component.css'],
})
export class TopLikeSongsComponent implements OnInit {
  songList: Song[] = [];
  song: Song;

  isPlaying = false;

  audio: any;

  constructor(private songService: SongService) {
    this.songService.getTopLikeSong().subscribe((res) => {
      this.songList = res;
    });
  }

  ngOnInit(): void {}

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
