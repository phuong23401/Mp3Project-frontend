import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/model/Song';
import { Playlist } from '../../model/Playlist';
import { PlaylistService } from '../../service/playlist/playlist.service';

@Component({
  selector: 'app-top-like-playlist',
  templateUrl: './top-like-playlist.component.html',
  styleUrls: ['./top-like-playlist.component.css'],
})
export class TopLikePlaylistComponent implements OnInit {
  playlistList: Playlist[] = [];
  playlist: Playlist;
  songs: Song[] = [];

  constructor(private playlistService: PlaylistService) {
    this.playlistService.getTopLiked().subscribe((res) => {
      this.playlistList = res;
    });
  }

  ngOnInit(): void {}

  listenCount(_playlist: Playlist) {
    this.playlistService.countListenPLaylistById(_playlist.id).subscribe((res) => {
      this.playlist = res;
    })

    this.playlistService.getSongOfPlaylist(_playlist.id).subscribe((res) => {
      this.songs = res;
    })
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
