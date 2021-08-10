import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PlaylistService} from '../../service/playlist/playlist.service';
import {Song} from '../../model/Song';
import {PlaylistResponse} from '../../model/PlaylistResponse';
import Swal from 'sweetalert2';
import {LikePlayListService} from '../../service/like-playlist/like-play-list.service';
import {Playlist} from '../../model/Playlist';
import {LikePlayList} from '../../model/LikePlayList';
import {UserService} from '../../service/user/user.service';
import {HttpService} from '../../service/http/http.service';
import {User} from '../../model/User';
import {SongService} from '../../service/song/song.service';
import {
  AngularFireStorage,
  AngularFireStorageReference,
} from '@angular/fire/storage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-playlistdetails',
  templateUrl: './playlistdetails.component.html',
  styleUrls: ['./playlistdetails.component.css'],
})
export class PlaylistdetailsComponent implements OnInit {
  formCreatePlaylist: FormGroup = new FormGroup({});
  isPlaying = false;
  audio: any;
  song: Song;
  isCheckLikeSong = false;
  sub: Subscription;
  id: number;
  user: User;
  songlist: Song[];
  listSong: Song[] = [];
  check: boolean = false;
  playList: PlaylistResponse;
  downloadURL?: string;
  form: File;
  ref?: AngularFireStorageReference;
  status = '';
  name: any;
  playlist: Playlist;
  userId: number;
  likeplaylist: LikePlayList[] = [];

  constructor(
    private active: ActivatedRoute,
    private playListService: PlaylistService,
    private afStorage: AngularFireStorage,
    private likePlayListService: LikePlayListService,
    private userService: UserService,
    private httpService: HttpService,
    private songService: SongService,
    private formBuilder: FormBuilder
  ) {
    this.sub = this.active.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
    });

    this.userId = Number(this.httpService.getID());
    this.userService.getUserById(this.httpService.getID()).subscribe((res) => {
      this.user = res;
    });

    this.playListService.getPlaylistById(this.id).subscribe((res) => {
      this.playlist = res;
    });

    this.getSongOfPlaylist();
    this.getPlayList();
    this.isPlaying = false;
    this.formCreatePlaylist = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
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
      if (this.song != null) {
        this.isPlaying = !this.isPlaying;
        this.audio = new Audio();
        this.audio.src = song.fileUrl;
        this.audio.play();
      }
    });
  }

  changePause() {
    this.isPlaying = !this.isPlaying;
    this.audio.pause();
  }

  deleteSong(i: number) {
    this.listSong.splice(i, 1);
    this.playList.songs = this.listSong;
    this.playListService.updatePlaylist(this.id, this.playList).subscribe(data=>{
      this.status = 'Delete Song Successfully !';
      Swal.fire({
        title: this.status,
        icon: 'success',
        confirmButtonColor: '#3bc8e7',
      });
    },(error) => {
      this.status = 'Delete Song Failed !';
      Swal.fire({
        title: this.status,
        text: 'Please try again!',
        icon: 'error',
        confirmButtonColor: '#3bc8e7',
      });
    });
  }

  onChangeName(value: any) {
    this.playList.name = value;
    this.playListService.updatePlaylist(this.id, this.playList).subscribe(
      (data) => {
        this.status = "Update playlist's name successfully !";
        Swal.fire({
          title: this.status,
          text: ' ',
          icon: 'success',
          confirmButtonColor: '#3bc8e7',
        });
      },
      (error) => {
        this.status = "Update playlist's name failed !";
        Swal.fire({
          title: this.status,
          text: 'Please check your infor',
          icon: 'error',
          confirmButtonColor: '#3bc8e7',
        });
      }
    );
  }

  onChangeAvatar(event: any) {
    this.form = event.target.files[0];
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.ref
      .put(this.form)
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL();
      })
      .then((downloadURL) => {
        this.downloadURL = downloadURL;
        this.playList.avatarUrl = downloadURL;
        this.playListService.updatePlaylist(this.id, this.playList).subscribe(
          (data) => {
            this.status = "Update playlist's avatar successfully !";
            Swal.fire({
              title: this.status,
              text: ' ',
              icon: 'success',
              confirmButtonColor: '#3bc8e7',
            });
          },
          (error) => {
            this.status = "Update playlist's avatar failed !";
            Swal.fire({
              title: this.status,
              text: ' ',
              icon: 'error',
              confirmButtonColor: '#3bc8e7',
            });
          }
        );
      })
      .catch((error) => {
        console.log(`Failed to upload avatar and get link ${error}`);
      });
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
