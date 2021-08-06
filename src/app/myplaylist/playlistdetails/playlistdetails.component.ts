import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {PlaylistService} from "../../service/playlist/playlist.service";
import {Song} from "../../model/Song";
import {PlaylistResponse} from "../../model/PlaylistResponse";
import Swal from "sweetalert2";
@Component({
  selector: 'app-playlistdetails',
  templateUrl: './playlistdetails.component.html',
  styleUrls: ['./playlistdetails.component.css']
})
export class PlaylistdetailsComponent implements OnInit {
  sub:Subscription;
  id:any;
  listSong: Song[]=[];
  check:boolean = false;
  playList: PlaylistResponse;
  constructor(private active: ActivatedRoute,
              private playListService: PlaylistService) {
    this.sub =this.active.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id')
    });
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

}
