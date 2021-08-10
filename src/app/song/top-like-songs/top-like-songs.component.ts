import { Component, OnInit } from '@angular/core';
import { Song } from '../../model/Song';
import { SongService } from '../../service/song/song.service';
import {BsModalService} from "ngx-bootstrap/modal";
import {AddSongDialogService} from "../../service/dialogsong/add-song-dialog.service";
import {AddSongDialogComponent} from "../../share/add-song-dialog/add-song-dialog.component";

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
  id:any;
  constructor(private songService: SongService,
              private modalService:BsModalService,
              private addSongDialog:AddSongDialogService) {
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
  getModal(id:number){
    this.id = id;
    this.addSongDialog.id = this.id;
    console.log(this.id)
    this.modalService.show(AddSongDialogComponent);
  }
}
