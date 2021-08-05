import { Component, OnInit } from '@angular/core';
import {SongService} from "../../service/song/song.service";
import {Song} from "../../model/Song";

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {
  success: any = {
    message: "Done"
  }
  status="";
  songList: Song[];
  isPlaying = false;
  audio : any;
  song: Song;
  constructor(private songService: SongService,
  ) {  this.isPlaying = false;
    this.songService.getMySong().subscribe(data =>{
      this.songList = data;
    })}

  ngOnInit(): void {

  }

  listen(song:Song){
    this.songService.getListenSongById(song.id).subscribe(data=>{
      this.song = data;
      if (this.song!=null){
        this.isPlaying = !this.isPlaying;
        this.audio = new Audio();
        this.audio.src = song.fileUrl;
        this.audio.load();
        this.audio.play();
      }
    })

  }
  changePause(){
    this.isPlaying = !this.isPlaying;
    this.audio.pause();
  }

  deleteSong(id:number){
    this.songService.deleteSongById(id).subscribe(data=>{
      if (JSON.stringify(this.success) == JSON.stringify(data)){
        this.status = "Success!";
        this.songService.getAllSongs().subscribe(data =>{
          this.songList = data;
        })
      }
    },error => {
      this.status= "Don't Success!"
    })

  }
  updateSong(id:number){

}

}
