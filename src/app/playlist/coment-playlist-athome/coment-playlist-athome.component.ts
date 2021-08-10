import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Song} from "../../model/Song";
import {Subscription} from "rxjs";
import {User} from "../../model/User";
import {PlaylistResponse} from "../../model/PlaylistResponse";
import {AngularFireStorage, AngularFireStorageReference} from "@angular/fire/storage";
import {Playlist} from "../../model/Playlist";
import {LikePlayList} from "../../model/LikePlayList";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {PlaylistService} from "../../service/playlist/playlist.service";
import {LikePlayListService} from "../../service/like-playlist/like-play-list.service";
import {UserService} from "../../service/user/user.service";
import {HttpService} from "../../service/http/http.service";
import {SongService} from "../../service/song/song.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-coment-playlist-athome',
  templateUrl: './coment-playlist-athome.component.html',
  styleUrls: ['./coment-playlist-athome.component.css']
})
export class ComentPlaylistAthomeComponent implements OnInit {
  // formCreatePlaylist: FormGroup = new FormGroup({});
  isPlaying = false;
  audio: any;
  song: Song;
  isCheckLikeSong = false;
  sub: Subscription;
  id: any;
  user: User;
  // songlist: Song[];
  listSong: Song[] = [];
  check: boolean = false;
  playList: PlaylistResponse;
  // downloadURL?: string;
  // form: File;
  ref?: AngularFireStorageReference;
  status = '';
  name: any;
  playlist: Playlist;
  userId: number;
  likeplaylist: LikePlayList[] = [];

  constructor(private active: ActivatedRoute,
              private playListService: PlaylistService,
              private afStorage: AngularFireStorage,
              private likePlayListService: LikePlayListService,
              private userService: UserService,
              private httpService: HttpService,
              private songService: SongService,
              private formBuilder: FormBuilder
  ) {
    this.sub = this.active.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
    });

    this.userId = Number(this.httpService.getID());
    this.userService.getUserById(this.httpService.getID()).subscribe((res) => {
      this.user = res;
    });

    this.playListService.getPlaylistById(this.id).subscribe((res) => {
    });

    this.getSongOfPlaylist();
    this.getPlayList();
    this.isPlaying = false;

  }

  ngOnInit(): void {
  }

  getPlayList() {
    this.playListService.getPlaylist(this.id).subscribe((data) => {
      this.playList = data;
    });
  }

  getSongOfPlaylist() {
    this.playListService.getSongOfPlaylist(this.id).subscribe(
      (data) => {
        this.listSong = data;
        if (this.listSong.length == 0) {
          this.check = true;
        }
      },
      (error) => {
        Swal.fire({
          title: 'Error!!!',
          text: ' ',
          icon: 'error',
          confirmButtonColor: '#3bc8e7',
        });
      }
    );
  }

  listen(song: Song) {
    this.songService.getSongById(song.id).subscribe((data) => {
      this.song = data;
    });

    const currentSong = {
      id: song.id,
      image: song.avatarUrl,
      title: song.name,
      artist: song.author,
      mp3: song.fileUrl,
    };
    localStorage.setItem('currentSong', JSON.stringify(currentSong));
  }

  likePlayListCount(playlist: Playlist) {
    this.likePlayListService.getLikeSongUpById(playlist.id).subscribe(
      (data) => {

        this.playlist = data;
        this.isCheckLikeSong = !this.isCheckLikeSong;
        Swal.fire({
          title: 'Like Success',
          icon: 'success',
          showCancelButton: true,
        });
      },
      (error) => {
        Swal.fire({
          title: 'Like fails',
          icon: 'warning',
          showCancelButton: true,
        });
      }
    );
  }
}
