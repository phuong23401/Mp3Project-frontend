import { Component, OnInit } from '@angular/core';
import { Song } from '../../model/Song';
import { SongService } from '../../service/song/song.service';
import { LikeService } from '../../service/like/like.service';
import { LikeSong } from '../../model/LikeSong';

@Component({
  selector: 'app-weekly-top',
  templateUrl: './weekly-top.component.html',
  styleUrls: ['./weekly-top.component.scss']
})
export class WeeklyTopComponent implements OnInit {
  songList: Song[];
  likeSongs: LikeSong[] = [];
  song: Song;
  isCheckLikeSong = false;
  isCheckInfoLike = false;

  constructor(
    private songService: SongService,
    private likeSongService: LikeService
  ) {}

  ngOnInit(): void {}

  likeCount(song: Song) {
    this.songService.getLikeSongUpById(song.id).subscribe(
      (data) => {
        console.log('data', data);
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
}
