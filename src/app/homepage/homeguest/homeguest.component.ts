import { Component, OnInit } from '@angular/core';
import {Song} from "../../model/Song";
import {Singers} from "../../model/Singers";
import {Commentsong} from "../../model/CommentSong";
import {SongService} from "../../service/song/song.service";
import {ActivatedRoute} from "@angular/router";
import {SingerService} from "../../service/singer/singer.service";
import {HttpService} from "../../service/http/http.service";
import {CommentSongService} from "../../service/comment/comment-song/comment-song.service";

@Component({
  selector: 'app-homeguest',
  templateUrl: './homeguest.component.html',
  styleUrls: ['./homeguest.component.css']
})
export class HomeguestComponent implements OnInit {

  id: number;
  song: Song;
  songList: Song[];
  playlist = [];
  audio: any;
  isPlaying = false;
  singer : Singers[];
  userId: number;
  commentSong: Commentsong[];

  constructor(
    private songService: SongService,
    private routes: ActivatedRoute,
    private singerService: SingerService,
    private httpService: HttpService,
    private commentSongService: CommentSongService
  ) {
    this.routes.paramMap.subscribe((paramMap) => {
      this.id = +paramMap.get('id');
      this.songService.getSongsById(this.id).subscribe((res) => {
        this.song = res;
      });
    });
    this.commentSongService.getCommentBySong(this.id).subscribe((res) => {
      this.commentSong = res;
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
    // music.RTL();
    // music.Menu();
    // music.Player_close();
    // music.Popup();
    // music.Slider();
    // music.More();
    // music.Nice_select();
    // music.showPlayList();
    // music.volume();
  }

}
