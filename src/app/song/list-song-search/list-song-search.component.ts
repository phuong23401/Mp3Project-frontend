import { Component, OnInit } from '@angular/core';
import {Song} from "../../model/Song";
import {SongService} from "../../service/song/song.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-list-song-search',
  templateUrl: './list-song-search.component.html',
  styleUrls: ['./list-song-search.component.css']
})
export class ListSongSearchComponent implements OnInit {
  nameSearch: string;
  songLists: Song[] = [];
  isPlaying = false;
  audio : any;
  song: Song;
  constructor(private songService: SongService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params =>{
      this.nameSearch = params.name;
      this.songService.getSongByName(this.nameSearch).subscribe(res =>{
        this.songLists = res;
      })
    })
  }
  listenCount(song:Song){
    this.isPlaying = !this.isPlaying;
    this.audio = new Audio();
    this.audio.src = song.fileUrl;
    this.audio.load();
    this.audio.play();
    this.songService.getListenSongById(song.id).subscribe(data=>{
      this.song = data;
    })

  }
  changePause(){
    this.isPlaying = !this.isPlaying;
    this.audio.pause();
  }

}
