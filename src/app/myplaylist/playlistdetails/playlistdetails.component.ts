import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {PlaylistService} from "../../service/playlist/playlist.service";
import {Song} from "../../model/Song";
import {PlaylistResponse} from "../../model/PlaylistResponse";
import Swal from "sweetalert2";
import {SongService} from "../../service/song/song.service";
import {AngularFireStorage, AngularFireStorageReference} from "@angular/fire/storage";
import {SongComponent} from "../../song/song-manager/song.component";
@Component({
  selector: 'app-playlistdetails',
  templateUrl: './playlistdetails.component.html',
  styleUrls: ['./playlistdetails.component.css']
})
export class PlaylistdetailsComponent implements OnInit {
  isPlaying = false;
  audio : any;
  song: Song;
  sub:Subscription;
  id:any;
  listSong: Song[]=[];
  check:boolean = false;
  playList: PlaylistResponse;
  downloadURL?: string;
  form: File;
  ref?: AngularFireStorageReference;
  status="";
  name:any;



  constructor(private active: ActivatedRoute,
              private afStorage: AngularFireStorage,
              private playListService: PlaylistService,
              private songService:SongService,
              private router:Router,
              private songSv:SongService) {
    this.sub =this.active.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id')
    });
    this.getSongOfPlaylist();
    this.getPlayList();
    this.isPlaying = false;

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
  listen(song:Song){
    this.songService.getSongById(song.id).subscribe(data=>{
      this.song = data;
      if (this.song!=null){
        this.isPlaying = !this.isPlaying;
        this.audio = new Audio();
        this.audio.src = song.fileUrl;
        // this.audio.load();
        this.audio.play();
      }
    })
  }
  changePause(){
    this.isPlaying = !this.isPlaying;
    this.audio.pause();
  }



  deleteSong(i:number){


  }


  onChangeName(value:any){
    this.playList.name = value;
    this.playListService.updatePlaylist(this.id,this.playList).subscribe(data=>{
      this.status = "Successflly!"
      Swal.fire({
        title: this.status,
        icon: "success",
        confirmButtonColor: "#3bc8e7"
      })
    }, error => {
      this.status = "Please check your infor !";
      Swal.fire({
        title: this.status,
        icon: "error",
        confirmButtonColor: "#3bc8e7"
      })
    })

  }

  onChangeAvatar(event: any) {
    this.form = event.target.files[0];
    const id = Math.random().toString(36).substring(2)
    this.ref = this.afStorage.ref(id);
    this.ref.put(this.form).then(snapshot => {
      return snapshot.ref.getDownloadURL();
    })
      .then(downloadURL => {
        this.downloadURL = downloadURL;
        this.playList.avatarUrl =downloadURL;
        this.playListService.updatePlaylist(this.id,this.playList).subscribe(data=>{
          this.status = "Successflly!"
          Swal.fire({
            title: this.status,
            icon: "success",
            confirmButtonColor: "#3bc8e7"
          })
        }, error => {
          this.status = "Please check your infor !";
          Swal.fire({
            title: this.status,
            icon: "error",
            confirmButtonColor: "#3bc8e7"
          })
        })
      })
      .catch(error => {
        console.log(`Failed to upload avatar and get link ${error}`);
      })
  }


}
