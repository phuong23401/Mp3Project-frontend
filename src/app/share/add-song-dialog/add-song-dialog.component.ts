import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PlaylistService } from "../../service/playlist/playlist.service";
import { PlaylistResponse } from "../../model/PlaylistResponse";
import { PlaylistReq } from "../../model/PlaylistReq";
import { Song } from "../../model/Song";
import { AddSongDialogService } from "../../service/dialogsong/add-song-dialog.service";
import { SongService } from "../../service/song/song.service";
import { AddSongToPlaylistReq } from "../../model/AddSongToPlaylistReq";
import { BsModalService } from "ngx-bootstrap/modal";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
@Component({
  selector: 'app-add-song-dialog',
  templateUrl: './add-song-dialog.component.html',
  styleUrls: ['./add-song-dialog.component.css']
})
export class AddSongDialogComponent implements OnInit {
  formCreatePlaylist: FormGroup = new FormGroup({});
  playlistByUser: PlaylistResponse[];
  playlist: PlaylistReq;
  playlistSongCurrent: PlaylistResponse;
  listSong: Song[] = [];
  song: Song = {};
  id: any;
  addSongToPlaylists: AddSongToPlaylistReq = {}
  status="";

  constructor(private playlistService: PlaylistService,
              private formBuilder: FormBuilder,
              private dialogService: AddSongDialogService) {
    this.getAllPlaylistByUser();
    this.formCreatePlaylist = this.formBuilder.group({
      name: ['', [Validators.required]],
    })
    this.id = this.dialogService.id;
  }

  ngOnInit(): void {
  }

  getAllPlaylistByUser() {
    this.playlistService.getPlaylistByUser().subscribe((playlistSv: PlaylistResponse[]) => {
      this.playlistByUser = playlistSv;
    })
  }

  addNewPlaylist() {
    const data = this.formCreatePlaylist.value;
    this.playlist = ({
      name: data.name,
      avatarUrl: "https://cdn3.vectorstock.com/i/1000x1000/26/62/runner-avatar-figure-with-mp3-player-music-block-vector-32312662.jpg"
    })
    this.playlistService.creatPlaylist(this.playlist).subscribe(next => {
      this.getAllPlaylistByUser();
    })
  }

  addSongToPlaylist(id: number) {
    this.addSongToPlaylists = {
      idSong: this.id,
      idPlaylist: id
    }
    this.playlistService.addSongToPlaylist(this.addSongToPlaylists).subscribe(data => {
      this.status = 'Create success!';
      Swal.fire({
        title: this.status,
        icon: "success",
        confirmButtonColor: "#3bc8e7"
      })
      localStorage.setItem("message","Success");
      this.status = localStorage.getItem("message");
      document.querySelector('.modal-backdrop').remove()
      document.body.classList.remove('modal-open')
      // @ts-ignore
      document.querySelector('.login_dialog').remove()
    });
  }
}
