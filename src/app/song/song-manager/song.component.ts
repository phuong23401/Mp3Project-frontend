import { Component, OnInit } from '@angular/core';
import { SongService } from '../../service/song/song.service';
import { Song } from '../../model/Song';
import Swal from 'sweetalert2';
import { ProfileService } from '../../service/profile/profile.service';
import { User } from '../../model/User';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css'],
})
export class SongComponent implements OnInit {
  success: any = {
    message: 'Done',
  };

  status = 'Empty...!';
  songList: Song[];
  isPlaying = false;
  audio: any;
  song: Song;
  userCurrent: User;
  check = false;
  singers: any[];

  constructor(
    private songService: SongService,
    private profileService: ProfileService
  ) {
    this.isPlaying = false;
    this.songService.getMySong().subscribe((data) => {
      this.songList = data;
      this.check = true;
    });
    this.profileService.getUserCurrent().subscribe((data) => {
      this.userCurrent = data;
    });
  }

  ngOnInit(): void {}

  listen(song: Song) {
    this.songService.getSongById(song.id).subscribe((data) => {
      this.song = data;
      if (this.song != null) {
        this.isPlaying = !this.isPlaying;
        this.audio = new Audio();
        this.audio.src = song.fileUrl;
        // this.audio.load();
        this.audio.play();
      }
    });
  }
  changePause() {
    this.isPlaying = !this.isPlaying;
    this.audio.pause();
  }

  deleteSong(id: number) {
    this.songService.deleteSongById(id).subscribe(
      (data) => {
        if (JSON.stringify(this.success) == JSON.stringify(data)) {
          this.status = 'Delete successfully !';
          Swal.fire({
            title: this.status,
            text: ' ',
            icon: 'success',
            confirmButtonColor: '#3bc8e7',
          });
          this.songService.getMySong().subscribe((data) => {
            this.songList = data;
          });
        }
      },
      (error) => {
        this.status = "Delete failed !";
        Swal.fire({
          title: this.status,
          text: ' ',
          icon: 'error',
          confirmButtonColor: '#3bc8e7',
        });
      }
    );
  }
  
  updateSong(id: number) {}
}
