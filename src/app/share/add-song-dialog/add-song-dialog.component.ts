import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PlaylistService} from "../../service/playlist/playlist.service";
import {PlaylistResponse} from "../../model/PlaylistResponse";
import {PlaylistReq} from "../../model/PlaylistReq";
import {Song} from "../../model/Song";
import {AddSongDialogService} from "../../service/dialogsong/add-song-dialog.service";
import {SongService} from "../../service/song/song.service";
import {AddSongToPlaylistReq} from "../../model/AddSongToPlaylistReq";

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

  constructor(private playlistService: PlaylistService,
              private formBuilder: FormBuilder,
              private dialogService: AddSongDialogService,
              private songService: SongService) {
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
      alert(data.message);
    });
  }


}
