import { Component, OnInit } from '@angular/core';
import {PlaylistService} from "../service/playlist/playlist.service";
import {PlaylistResponse} from "../model/PlaylistResponse";

@Component({
  selector: 'app-myplaylist',
  templateUrl: './myplaylist.component.html',
  styleUrls: ['./myplaylist.component.css']
})
export class MyplaylistComponent implements OnInit {
  listPlaylist: PlaylistResponse[] = [];
  constructor(private playListService: PlaylistService) {
    this.getPlaylist();
  }
  getPlaylist(){
    this.playListService.getPlaylistByUser().subscribe(data=>{
      this.listPlaylist = data;
    });
  }
  ngOnInit(): void {
  }

  playListDetails($event: any){

  }

}
