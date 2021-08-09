import { Component, OnInit } from '@angular/core';
import { Playlist } from '../../model/Playlist';
import { PlaylistService } from '../../service/playlist/playlist.service';

@Component({
  selector: 'app-top-listened-playlist',
  templateUrl: './top-listened-playlist.component.html',
  styleUrls: ['./top-listened-playlist.component.css'],
})
export class TopListenedPlaylistComponent implements OnInit {
  playlistList: Playlist[] = [];

  constructor(private playlistService: PlaylistService) {
    this.playlistService.getTopListened().subscribe((res) => {
      this.playlistList = res;
    });
  }

  ngOnInit(): void {}
}
