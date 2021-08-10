import { LikeService } from './../../service/like/like.service';
import { Component, OnInit } from '@angular/core';
import { SongService } from '../../service/song/song.service';
import { Song } from '../../model/Song';
import { LikeSong } from 'src/app/model/LikeSong';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddSongDialogComponent } from '../../share/add-song-dialog/add-song-dialog.component';
import { PlaylistResponse } from '../../model/PlaylistResponse';
import { AddSongDialogService } from '../../service/dialogsong/add-song-dialog.service';

@Component({
  selector: 'app-recently-played',
  templateUrl: './recently-played.component.html',
  styleUrls: ['./recently-played.component.scss'],
})
export class RecentlyPlayedComponent implements OnInit {
  songList: Song[];
  likeSongs: LikeSong[] = [];
  isPlaying = false;
  audio: any;
  song: Song;
  name: string;
  isCheckLikeSong = false;
  isCheckInfoLike = false;
  id: any;
  playlistSongCurrent: PlaylistResponse;

  constructor(
    private songService: SongService,
    private likeSongService: LikeService,
    private modalService: BsModalService,
    private addSongDialog: AddSongDialogService
  ) {}

  ngOnInit(): void {
    this.isPlaying = false;
    this.songService.getAllSongs().subscribe((res) => {
      this.songList = res;
    });
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
        alert('Please login before click like!');
      }
    );
  }

  checkLikeSong() {
    //Thay doi trang thai nut bam LIKE
    this.likeSongService.getListLikeSongByUser().subscribe((data) => {
      this.likeSongs = data;
      for (let i = 0; i < this.songList.length; i++) {
        if (
          JSON.stringify(this.song.name) ==
          JSON.stringify(this.likeSongs[i].nameSong)
        ) {
          this.isCheckLikeSong = true;
        }
      }
    });
  }

  listenCount(song: Song) {
    this.isPlaying = !this.isPlaying;
    this.audio = new Audio();
    this.audio.src = song.fileUrl;
    // this.audio.load();
    // this.audio.play();
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

  changePause() {
    this.isPlaying = !this.isPlaying;
    this.audio.pause();
  }

  getModal(id: number) {
    this.id = id;
    this.addSongDialog.id = this.id;
    this.modalService.show(AddSongDialogComponent);
  }
}
