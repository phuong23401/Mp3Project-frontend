import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Song } from '../model/Song';
import { SongService } from '../service/song/song.service';
import { Subscription } from 'rxjs';
import { Playlist } from '../model/Playlist';
import { PlaylistService } from '../service/playlist/playlist.service';
import { User } from '../model/User';
import { ProfileService } from '../service/profile/profile.service';
import { PlaylistResponse } from '../model/PlaylistResponse';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  name: any = '';
  songList: Song[] = [];
  randomSong: Song;
  subscription: Subscription = new Subscription();
  songS: Song[] = [];
  song: Song;
  listPlaylist: Playlist[] = [];
  user: User;
  id: any;
  lisplaylists: Playlist;
  status = '';
  isCheckInfoLike = false;

  constructor(
    private router: Router,
    private songService: SongService,
    private playlist: PlaylistService,
    private cdr: ChangeDetectorRef,
    private userCurent: ProfileService
  ) {
    this.userCurent.getUserCurrent().subscribe((data) => {
      this.user = data;
    });

    this.playlist
      .getPlaylistByUser()
      .subscribe((playlistSv: PlaylistResponse[]) => {
        this.listPlaylist = playlistSv;
      });
  }

  likeCount(song: Song) {
    this.songService.getLikeSongUpById(song.id).subscribe(
      (data) => {
        this.song = data;
      },
      (error) => {
        alert('Please login before click like!');
      }
    );
  }

  getPlayList() {
    this.playlist.getPlaylist(this.id).subscribe((data) => {
      this.lisplaylists = data;
    });
  }

  ngOnInit(): void {
    this.songService.getAllSongs().subscribe((res) => {
      this.songList = res;
      this.randomSong =
        this.songList[Math.floor(Math.random() * this.songList.length)];
    });
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    music.Slider();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  listenCount(song: Song) {
    this.songService.getListenSongById(song.id).subscribe((data) => {
      this.song = data;
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

  likeCount(song: Song) {
    this.songService.getLikeSongUpById(song.id).subscribe(
      (data) => {
        this.song = data;
        setTimeout(() => {
          this.isCheckInfoLike = true;
        }, 1000);
      },
      (error) => {
        Swal.fire({
          title: 'Please login before click like !',
          text: ' ',
          icon: 'error',
          confirmButtonColor: '#3bc8e7',
        })
      }
    );
  }
}
