import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PlaylistService} from "../../service/playlist/playlist.service";
import {PlaylistResponse} from "../../model/PlaylistResponse";
import {PlaylistReq} from "../../model/PlaylistReq";
import {Playlist} from "../../model/Playlist";
import Swal from "sweetalert2";
import {Song} from "../../model/Song";
import {AddSongDialogService} from "../../service/dialogsong/add-song-dialog.service";
import {SongService} from "../../service/song/song.service";
import {User} from "../../model/User";
import {Singers} from "../../model/Singers";

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
  song:Song = {};
  id: any;
  constructor(private playlistService: PlaylistService,
              private formBuilder: FormBuilder,
              private dialogService: AddSongDialogService,
              private songService:SongService) {
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

  getPlaylistCurrentAddSong(id: number) {
    this.getSongById();
    console.log("song"+this.song)
    this.playlistService.getPlaylist(id).subscribe((data: PlaylistResponse) => {
      this.playlistSongCurrent = data;
      console.log("playlist"+this.playlistSongCurrent.name)
    })
    this.listSong = this.playlistSongCurrent.songs;
    this.listSong.push(this.song);
    console.log(this.listSong);
    this.playlistSongCurrent.songs=this.listSong;
    this.playlistService.updatePlaylist(this.id,this.playlistSongCurrent).subscribe(data=>{

      document.querySelector('.modal-backdrop').remove()
      document.body.classList.remove('modal-open')
      document.querySelector('.modal-dialog').remove()
    })

  }
  getSongById(){
    console.log("id song :"+this.id)
    this.songService.getSongById(this.id).subscribe((data:Song)=>{
      console.log("data: "+data)
      this.song = data;
      console.log("Thiss Song :"+ this.song)
    })
  }
}
