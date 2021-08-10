import { Component, OnInit } from '@angular/core';
import { SongService } from '../../service/song/song.service';
import { Song } from '../../model/Song';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-song',
  templateUrl: './detail-song.component.html',
  styleUrls: ['./detail-song.component.css'],
})
export class DetailSongComponent implements OnInit {
  id: number;
  song: Song;
  songList: Song[];
  playlist = [];
  audio: any;
  isPlaying = false;

  constructor(
    private songService: SongService,
    private routes: ActivatedRoute
  ) {
    this.routes.paramMap.subscribe((paramMap) => {
      const id = +paramMap.get('id');
      this.songService.getSongsById(id).subscribe((res) => {
        this.song = res;
      });
    });
    this.songService.getAllSongs().subscribe((res) => {
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
    });
  }
  changePause() {
    this.isPlaying = !this.isPlaying;
    this.audio.pause();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    music.Slider();
  }
}
