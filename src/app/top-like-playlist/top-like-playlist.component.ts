import { Component, OnInit } from '@angular/core';
import {Playlist} from "../model/Playlist";
import {PlaylistService} from "../service/playlist/playlist.service";

@Component({
  selector: 'app-top-like-playlist',
  templateUrl: './top-like-playlist.component.html',
  styleUrls: ['./top-like-playlist.component.css']
})
export class TopLikePlaylistComponent implements OnInit {
  playlistList: Playlist[] = [];

  constructor(private playlistService: PlaylistService) {
    this.playlistService.getTopLiked().subscribe(res => {
      this.playlistList = res;
    });
  }

  ngOnInit(): void {
  }

}
