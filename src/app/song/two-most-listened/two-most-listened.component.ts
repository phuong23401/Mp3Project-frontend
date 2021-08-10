import { Component, OnInit } from '@angular/core';
import { Song } from '../../model/Song';
import { SongService } from '../../service/song/song.service';
import { AddSongDialogComponent } from '../../share/add-song-dialog/add-song-dialog.component';
import { AddSongDialogService } from '../../service/dialogsong/add-song-dialog.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LikeSong } from '../../model/LikeSong';
import {LoginDialogComponent} from "../../share/login-dialog/login-dialog.component";
import {TokenService} from "../../service/token/token.service";

@Component({
  selector: 'app-two-most-listened',
  templateUrl: './two-most-listened.component.html',
  styleUrls: ['./two-most-listened.component.css'],
})
export class TwoMostListenedComponent implements OnInit {
  songList: Song[] = [];
  likeSongs: LikeSong[] = [];
  isCheckLikeSong = false;
  isCheckInfoLike = false;
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

  constructor(
    private songService: SongService,
    private addSongDialog: AddSongDialogService,
    private modalService: BsModalService,
    private tokenService:TokenService
  ) {}

  ngOnInit(): void {
    this.topSongsView();
  }

  likeCount(song: Song) {
    this.songService.getLikeSongUpById(song.id).subscribe((data) => {
        this.isCheckLikeSong = !this.isCheckLikeSong;
        this.song = data;
      },
      (error) => {
        alert('Please login before click like!');
      }
    );
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

    const playlist = localStorage.getItem('playlist')
      ? JSON.parse(localStorage.getItem('playlist'))
      : [];
    const currentSong = {
      id: song.id,
      image: song.avatarUrl,
      title: song.name,
      artist: song.author,
      mp3: song.fileUrl,
    };
    localStorage.setItem('currentSong', JSON.stringify(currentSong));

    if (song !== undefined && !playlist.find((_song) => _song.id === song.id)) {
      playlist.unshift(currentSong);
      localStorage.setItem('playlist', JSON.stringify(playlist));
    }
  }

  getModal(id: number) {
    if (this.tokenService.getToken()){
      this.id = id;
      this.addSongDialog.id = this.id;
      this.modalService.show(AddSongDialogComponent);
    }else {
      this.modalService.show(LoginDialogComponent);
    }

  }
}
