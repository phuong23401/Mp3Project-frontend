
import { LikeService } from './../../service/like/like.service';
import { Component, OnInit } from '@angular/core';
import {SongService} from "../../service/song/song.service";
import {Song} from "../../model/Song";
import { DataService } from 'src/app/share/dataTrans/data.service';
import Swal from 'sweetalert2';
import { LikeSong } from 'src/app/model/LikeSong';

@Component({
  selector: 'app-recently-played',
  templateUrl: './recently-played.component.html',
  styleUrls: ['./recently-played.component.scss']
})
export class RecentlyPlayedComponent implements OnInit {
  songList: Song[];
  likeSongs: LikeSong[]=[];
  isPlaying = false;
  audio : any;
  song: Song;
  name:string;
  isCheckLikeSong = false;
  isCheckInfoLike = false;

  constructor(private songService: SongService,
    private data: DataService,
    private likeSongService: LikeService
              ) { }

  ngOnInit(): void {
    this.isPlaying = false;
    this.songService.getAllSongs().subscribe(res =>{
      this.songList = res;
    })
  }

  likeCount(song:Song) {
      this.songService.getLikeSongUpById(song.id).subscribe(data => {
            console.log('data',data)
            this.song = data;
            setTimeout(()=>{
              this.isCheckInfoLike = true;
         }, 1000);

          },
          error => {
            alert('Please login before click like!')
          }
        );
    }

    checkLikeSong(){ //Thay doi trang thai nut bam LIKE
      this.likeSongService.getListLikeSongByUser().subscribe(data =>{
        this.likeSongs = data;
        console.log('listLike',data)
        console.log('lenglike',this.songList.length)
        console.log('nameSong: ',this.song.name)
        for(let i=0; i<this.songList.length;i++){
          console.log('i = ',i,' likesong.nameSong = ',this.likeSongs[i].nameSong)
          if(JSON.stringify(this.song.name)==JSON.stringify(this.likeSongs[i].nameSong)){
            this.isCheckLikeSong = true;
            console.log('isCheckLikeSong',this.isCheckLikeSong)
          }
        }
      })
      }

  listenCount(song:Song){
   this.isPlaying = !this.isPlaying;
    this.audio = new Audio();
    this.audio.src = song.fileUrl;
    this.audio.load();
    // this.audio.play();
    this.songService.getListenSongById(song.id).subscribe(data=>{
      this.song = data;
    })
    const playlist = localStorage.getItem("playlist") ? JSON.parse(localStorage.getItem("playlist")) : [];
    const currentSong = {
      id: song.id,
      image : song.avatarUrl,
      title: song.name,
      artist: song.author,
      mp3: song.fileUrl,
    };
    localStorage.setItem("currentSong", JSON.stringify(currentSong));

    if(song !== undefined && !playlist.find(_song => _song.id === song.id)) {
      playlist.unshift(currentSong);

      localStorage.setItem("playlist", JSON.stringify(playlist));
    }
    document.getElementById("jquery_jplayer_1").dispatchEvent(new Event("jPlayer_play"));
  }
  changePause(){
    this.isPlaying = !this.isPlaying;
    this.audio.pause();
  }
}
