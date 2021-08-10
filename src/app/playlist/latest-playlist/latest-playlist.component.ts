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
    this.playlistService.countListenPLaylistById(_playlist.id).subscribe((res) => {
      this.playlist = res;
    });

    this.playlistService.getSongOfPlaylist(_playlist.id).subscribe((res) => {
      this.songs = res;
    });
    localStorage.setItem('playlist', JSON.stringify(this.songs));

    const currentSong = {
      id: this.songs[0].id,
      image: this.songs[0].avatarUrl,
      title: this.songs[0].name,
      artist: this.songs[0].author,
      mp3: this.songs[0].fileUrl,
    };
    localStorage.setItem('currentSong', JSON.stringify(currentSong));
  }
}
