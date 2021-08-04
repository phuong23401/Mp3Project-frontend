import { Component, OnInit } from '@angular/core';
import {SongService} from "../../service/song/song.service";
import {Song} from "../../model/Song";
import { DataService } from 'src/app/share/dataTrans/data.service';

@Component({
  selector: 'app-recently-played',
  templateUrl: './recently-played.component.html',
  styleUrls: ['./recently-played.component.scss']
})
export class RecentlyPlayedComponent implements OnInit {
  songList: Song[];
  isPlaying = false;
  audio : any;
  song: Song;
  name:string;

  constructor(private songService: SongService,
    private data: DataService,
              ) { }

  ngOnInit(): void {
    this.isPlaying = false;
    this.songService.getAllSongs().subscribe(res =>{
      this.songList = res;
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
