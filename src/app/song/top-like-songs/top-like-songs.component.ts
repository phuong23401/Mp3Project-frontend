import { Component, OnInit } from '@angular/core';
import { Song } from '../../model/Song';
import { SongService } from '../../service/song/song.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddSongDialogService } from '../../service/dialogsong/add-song-dialog.service';
import { AddSongDialogComponent } from '../../share/add-song-dialog/add-song-dialog.component';
import {LoginDialogComponent} from "../../share/login-dialog/login-dialog.component";
import {TokenService} from "../../service/token/token.service";

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
  id: any;
  constructor(
    private songService: SongService,
    private modalService: BsModalService,
    private addSongDialog: AddSongDialogService,
    private tokenService:TokenService
  ) {
    this.songService.getTopLikeSong().subscribe((res) => {
      this.songList = res;
    });
  }

  ngOnInit(): void {}

  listenCount(song: Song) {
    this.isPlaying = !this.isPlaying;
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
