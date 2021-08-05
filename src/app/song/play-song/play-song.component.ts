import { Component, OnInit } from '@angular/core';
import {SongService} from "../../service/song/song.service";
import {Song} from "../../model/Song";
import { ActivatedRoute } from '@angular/router';
declare var Amplitude: any;

@Component({
  selector: 'app-play-song',
  templateUrl: './play-song.component.html',
  styleUrls: ['./play-song.component.css']
})
export class PlaySongComponent implements OnInit {
  
  id: number;
  song: Song;
  songList: Song[];
  playlist = [];
  audio : any;
  isPlaying = false;
  constructor(private  songService: SongService,
    private routes: ActivatedRoute,) { }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(paramMap =>{
      const id = +paramMap.get('id')
      this.songService.getSongById(id).subscribe(res =>{
      this.song = res;
      if(this.song != null){
        this.audio.src = this.song.fileUrl;
        this.audio.load();
        this.audio.play();
  
      }
      console.log(this.song.fileUrl)
      this.audio.src = this.song.fileUrl;
      window.location.reload();
    });
    })
    this.songService.getAllSongs().subscribe(res =>{
      this.songList = res;
    })
    
    
  }
  listenCount(song:Song){
    this.isPlaying = !this.isPlaying;
    this.songService.getListenSongById(song.id).subscribe(data=>{
      this.song = data;
    })
  }
  changePause(){
    this.isPlaying = !this.isPlaying;
    this.audio.pause();
  }

}
