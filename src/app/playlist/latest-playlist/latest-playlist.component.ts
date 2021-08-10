import { Song } from 'src/app/model/Song';
import { Component, OnInit } from '@angular/core';
import { Playlist } from 'src/app/model/Playlist';
import { PlaylistService } from 'src/app/service/playlist/playlist.service';

@Component({
  selector: 'app-latest-playlist',
  templateUrl: './latest-playlist.component.html',
  styleUrls: ['./latest-playlist.component.css'],
})
export class LatestPlaylistComponent implements OnInit {
  playlists: Playlist[] = [];
  playlist: Playlist;
  songs: Song[] = [];

  constructor(private playlistService: PlaylistService) {
    this.playlistService.getNewlestCreated().subscribe((res) => {
      this.playlists = res;
    });
  }

  ngOnInit(): void {}

  listenCount(_playlist: Playlist) {
    // this.playlistService.countListenPLaylistById(_playlist.id).subscribe((res) => {
    //   this.playlist = res;
    // });
  }
}
