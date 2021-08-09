
import { LikeService } from './../../service/like/like.service';
import { Component, OnInit } from '@angular/core';
import {SongService} from "../../service/song/song.service";
import {Song} from "../../model/Song";
import { DataService } from 'src/app/share/dataTrans/data.service';
import Swal from 'sweetalert2';
import { LikeSong } from 'src/app/model/LikeSong';
import {BsModalService} from "ngx-bootstrap/modal";
import {AddSongDialogComponent} from "../../share/add-song-dialog/add-song-dialog.component";
import {PlaylistResponse} from "../../model/PlaylistResponse";
import {AddSongDialogService} from "../../service/dialogsong/add-song-dialog.service";

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
  id:any;
  playlistSongCurrent:PlaylistResponse;


  constructor(private songService: SongService,
    private data: DataService,
    private likeSongService: LikeService,
              private modalService:BsModalService,
              private addSongDialog:AddSongDialogService
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
    this.audio.play();
    this.songService.getListenSongById(song.id).subscribe(data=>{
      this.song = data;
    })

    if(song !== undefined) {
      localStorage.setItem("currentSong", JSON.stringify({
        image : song.avatarUrl,
        title: song.name,
        artist: song.author,
        mp3: song.fileUrl
      }));

      document.getElementById("jquery_jplayer_1").dispatchEvent(new Event("jPlayer_play"));
    }
  }
  changePause(){
    this.isPlaying = !this.isPlaying;
    this.audio.pause();
  }

  getModal(id:number){
    this.id = id;
    this.addSongDialog.id = this.id;
    console.log(this.id)
    this.modalService.show(AddSongDialogComponent);
  }

}
