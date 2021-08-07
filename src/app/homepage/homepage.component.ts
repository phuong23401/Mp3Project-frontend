import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Song} from "../model/Song";
import {SongService} from "../service/song/song.service";
import {Playlist} from "../model/Playlist";
import {PlaylistService} from "../service/playlist/playlist.service";
import {User} from "../model/User";
import {ProfileService} from "../service/profile/profile.service";
import {PlaylistResponse} from "../model/PlaylistResponse";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  name: any = '';


  songList: Song[] = [];
  randomSong: Song;
  songS: Song[] = [];
  song: Song;
  listPlaylist: Playlist[] = [];
  user: User

  constructor(private router: Router,
              private songService: SongService,
              private playlist: PlaylistService,
              private userCurent:ProfileService) {
    this.userCurent.getUserCurrent().subscribe(data =>{
      this.user = data;
    });
    this.playlist.getPlaylistByUser().subscribe((playlistSv:PlaylistResponse[])=>{
      this.listPlaylist = playlistSv;
    })
  }

  ngOnInit(): void {
    this.songService.getAllSongs().subscribe(res => {
      this.songList = res;
      this.randomSong = this.songList[Math.floor(Math.random() * this.songList.length)]
      console.log(this.randomSong)
    });
  }

  // addSonginPlaylist(id: number) {
  //   this.songService.getSongById(id).subscribe((data: Song) => {
  //     this.song = data;
  //     this.songS.push(this.song);
  //     this.listPlaylist.
  //
  //   })
  //
  // }
}
