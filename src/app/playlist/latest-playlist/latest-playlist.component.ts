import { Song } from 'src/app/model/Song';
import { Component, OnInit } from '@angular/core';
import { Playlist } from 'src/app/model/Playlist';
import { PlaylistService } from 'src/app/service/playlist/playlist.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-latest-playlist',
  templateUrl: './latest-playlist.component.html',
  styleUrls: ['./latest-playlist.component.css'],
})
export class LatestPlaylistComponent implements OnInit {
  playlists: Playlist[] = [];
  playlist: Playlist;
  songs: Song[] = [];
  isCheckLikeSong = false;
  constructor(private playlistService: PlaylistService) {
    this.playlistService.getNewlestCreated().subscribe((res) => {
      this.playlists = res;
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
