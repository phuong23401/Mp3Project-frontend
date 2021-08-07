import { Router } from '@angular/router';
import { Song } from "../model/Song";
import { SongService } from "../service/song/song.service";
import {Subscription} from "rxjs";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Playlist} from "../model/Playlist";
import {PlaylistService} from "../service/playlist/playlist.service";
import {User} from "../model/User";
import {ProfileService} from "../service/profile/profile.service";
import {PlaylistResponse} from "../model/PlaylistResponse";
import Swal from "sweetalert2";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit,OnDestroy {
  name: any = '';


  songList: Song[] = [];
  randomSong : Song;
  subscription:Subscription = new Subscription();
  songS: Song[] = [];
  song: Song;
  listPlaylist: Playlist[] = [];
  user: User;
  id: any;
lisplaylists:Playlist
  status ="";
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
  getPlayList(){
    this.playlist.getPlaylist(this.id).subscribe(data=>{
      this.lisplaylists = data;
    })

  }

  ngOnInit(): void {
    this.subscription.add(
      this.songService.getAllSongs().subscribe(res =>{
          this.songList = res;
        this.randomSong = this.songList[Math.floor(Math.random() * this.songList.length)]
        console.log(this.randomSong)
      })
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


  addSonginPlaylist(id: number) {
    this.songService.getSongById(id).subscribe((data: Song) => {
      this.song = data;
      this.songS.push(this.song);
      this.lisplaylists.songs = this.songS;
      this.playlist.updatePlaylist(this.id,this.lisplaylists).subscribe((data:Playlist)=>{
        this.status = "Successflly!"
        Swal.fire({
          title: this.status,
          icon: "success",
          confirmButtonColor: "#3bc8e7"
        })
        this.router.navigate(['/myplaylist'])
      }, error => {
        this.status = "Please check your infor !";
        Swal.fire({
          title: this.status,
          icon: "error",
          confirmButtonColor: "#3bc8e7"
        })
      })

    })

  }
}
