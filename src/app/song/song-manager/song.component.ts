import { Component, OnInit } from '@angular/core';
import {SongService} from "../../service/song/song.service";
import {Song} from "../../model/Song";

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {
id:any;
audio:any;
song:Song={};
  listSong:Song[]=[];
  constructor(private songService: SongService) {
    this.songService.getAllSongs().subscribe((data)=>{
      this.listSong = data;
    })
  }

  ngOnInit(): void {
  }
  deleteSong(id:number){

  }
  playSong(id:number){
      this.songService.getSongById(id).subscribe((data)=>{
        this.song = data;
        this.audio.src = this.song.fileUrl;
        this.audio.load();
        this.audio.play();
        console.log(this.song)
      })
  }


}
