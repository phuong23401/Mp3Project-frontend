import { Component, OnInit } from '@angular/core';
import {Song} from "../../model/Song";
import {SongService} from "../../service/song/song.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-two-most-listened',
  templateUrl: './two-most-listened.component.html',
  styleUrls: ['./two-most-listened.component.css']
})
export class TwoMostListenedComponent implements OnInit {
  isPlaying: boolean;
  songList: Song[] = [];
  i =0;
  song: Song[];
  songs: Song[];
  msbapDisplayTitle = false;
  msbapDisplayVolumeControls = true;
  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapDisplayVolumeControls = true;
  likeCounter = 0;
  checkPause = 0;
  listenCounter = 0;
  id: any;
  constructor(private songService: SongService, private router: Router) { }

  ngOnInit(): void {
    this.topSongsView();
  }
  topSongsView(): any {
    this.isPlaying = false;
    this.songService.topSongsView().subscribe(songList => {
      this.songList = songList;
    });
  }
  play() {
    this.isPlaying = true;
  }
  onClick($event){

    console.log('even',$event);

    if($event.isTrusted==true){
      this.i = this.i + 1;
      console.log('dem',this.i);
    }
    console.log('even',$event)
  }
  listenCount(id: number){
    this.isPlaying = !this.isPlaying
    this.songService.topSongsView().subscribe(data=>{
      this.song = data;
      console.log('data',data)
    })
  }
  changePause(){
    this.isPlaying = !this.isPlaying;
  }

}
