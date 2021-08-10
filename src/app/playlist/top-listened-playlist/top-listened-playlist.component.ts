import { Component, OnInit } from '@angular/core';
import { Playlist } from '../../model/Playlist';
import { PlaylistService } from '../../service/playlist/playlist.service';
import { Song } from 'src/app/model/Song';

@Component({
  selector: 'app-top-listened-playlist',
  templateUrl: './top-listened-playlist.component.html',
  styleUrls: ['./top-listened-playlist.component.css'],
})
export class TopListenedPlaylistComponent implements OnInit {
  playlistList: Playlist[] = [];
  playlist: Playlist;
  songs: Song[] = [];

  constructor(private playlistService: PlaylistService) {
    this.playlistService.getTopListened().subscribe((res) => {
      this.playlistList = res;
    });
  }

  ngOnInit(): void {}

  listenCount(_playlist: Playlist) {
    // this.playlistService.countListenPLaylistById(_playlist.id).subscribe((res) => {
    //   this.playlist = res;
    // })

    // this.playlistService.getSongOfPlaylist(_playlist.id).subscribe((res) => {
    //   this.songs = res.map((s) => {
    //     return {
    //       ...s,
    //       mp3: s.fileUrl
    //     }
    //   })
    //   localStorage.setItem('playlist', JSON.stringify(this.songs));
    // });
  }
}
