import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {PlaylistService} from "../../service/playlist/playlist.service";
import {Song} from "../../model/Song";
import {PlaylistResponse} from "../../model/PlaylistResponse";
import Swal from "sweetalert2";
import {LikePlayListService} from "../../service/like-playlist/like-play-list.service";
import {Playlist} from "../../model/Playlist";
import {LikePlayList} from "../../model/LikePlayList";
import {UserService} from "../../service/user/user.service";
import {HttpService} from "../../service/http/http.service";
import {User} from "../../model/User";
@Component({
  selector: 'app-playlistdetails',
  templateUrl: './playlistdetails.component.html',
  styleUrls: ['./playlistdetails.component.css']
})
export class PlaylistdetailsComponent implements OnInit {
  sub:Subscription;
  id:any;
  user: User;
  songlist:Song[];
  listSong: Song[]=[];
  check:boolean = false;
  check1 = false;
  playList: PlaylistResponse;
  playlist: Playlist;
  userId: number;
  likeplaylist: LikePlayList[] =[];
  constructor(private active: ActivatedRoute,
              private playListService: PlaylistService,
              private likePlayListService: LikePlayListService,
              private userService : UserService,
              private httpService: HttpService) {
    this.sub =this.active.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id')
    });
    this.userId = Number(this.httpService.getID());
    this.userService.getUserById(this.httpService.getID()).subscribe(res => {
      this.user = res;
      console.log("user la ",this.user);
      console.log("like playlist", this.likeplaylist)
    });
    this.playListService.getPlaylistById(this.id).subscribe(res => {
      this.songlist = res.songs;
      this.playlist = res;
      console.log("songlist ",this.songlist , this.playlist);
    })
    this.getSongOfPlaylist();
    this.getPlayList();
  }
  getPlayList(){
    this.playListService.getPlaylist(this.id).subscribe(data=>{
      this.playList = data;
    })

  }

  getSongOfPlaylist(){
    this.playListService.getSongOfPlaylist(this.id).subscribe(data =>{
      this.listSong = data;
      if(this.listSong.length == 0){
        this.check = true;
      }
    }, error => {
      Swal.fire({
        title: "Error!!!",
        icon: "error",
        confirmButtonColor: "#3bc8e7"
      });
    })
  }
  ngOnInit(): void {
  }


  likePlayList(playlist, like){
    if (like.status){
      playlist.countLike--;
      like.status = false
    }else {
      playlist.countLike++;
     like.status = true;
    }
    this.likePlayListService.createLikePlayList(like).subscribe(() =>{
       this.playListService.upPlaylist(playlist).subscribe(()=>{
         this.playListService.getPlaylistById(playlist.id).subscribe(res =>{
           this.playlist = res;
         })
       })
        Swal.fire({
          title: "Like Success",
          icon: 'success',
          showCancelButton: true,

        })
    })
    Swal.fire({
      title: "Like fails",
      icon: 'warning',
      showCancelButton: true,

    })
  };
  likePlayListCount(playlist:Playlist) {
    this.likePlayListService.getLikeSongUpById(playlist.id).subscribe(data => {
        console.log('data',data)
        this.playlist = data
        Swal.fire({
          title: "Like Success",
          icon: 'success',
          showCancelButton: true,

        })
      }
      ,
      error => {
        Swal.fire({
          title: "Like fails",
          icon: 'warning',
          showCancelButton: true,

        })
      }
    )
  }



}
