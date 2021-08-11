import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/model/Song';
import { Playlist } from '../../model/Playlist';
import { PlaylistService } from '../../service/playlist/playlist.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-top-like-playlist',
  templateUrl: './top-like-playlist.component.html',
  styleUrls: ['./top-like-playlist.component.css'],
})
export class TopLikePlaylistComponent implements OnInit {
  playlistList: Playlist[] = [];
  playlist: Playlist;
  songs: Song[] = [];
  isCheckLikeSong = false;
  constructor(private playlistService: PlaylistService) {
    this.playlistService.getTopLiked().subscribe((res) => {
      this.playlistList = res;
    });
  }

  ngOnInit(): void {}

  listenCount(_playlist: Playlist) {
    this.playlistService.countListenPLaylistById(_playlist.id);
  }
  likeCount(playlist: Playlist) {
    this.playlistService.countLikePLaylistById(playlist.id).subscribe(res => {
        this.isCheckLikeSong = true;
      },
      error => {
        this.isCheckLikeSong = false;
        Swal.fire({
          title: "You must login before click like !",
          text: " ",
          icon:"error",
          confirmButtonColor:"#3bc8e7"})
      })
  }
}
