import { Component, OnInit } from '@angular/core';
import {SongService} from "../service/song/song.service";
import {Song} from "../model/Song";
import {User} from "../model/User";

@Component({
  selector: 'app-createsong',
  templateUrl: './createsong.component.html',
  styleUrls: ['./createsong.component.css']
})
export class CreatesongComponent implements OnInit {
  status = 'Please fill in the form to create Song!'
  isCheckUploadAvatar = false;
  isCheckUploadFile = false;
  form: any = {};
  error1: any = {
    message: "noavatar"
  }
  error2: any = {
    message: "nomp3url"
  }
  success: any = {
    message: "yes"
  }
  song:Song={};

  user:User={};
  constructor(private songService: SongService) {


  }

  ngOnInit(): void {
  }
  ngSubmit(){
   this.song.name = this.form.name;
   this.song.lyrics = this.form.lyrics;
   this.song.category = this.form.category;
   this.song.singers = this.form.singers;
   this.song.user = this.user;
    this.songService.createSong(this.song).subscribe(data =>{
      if(JSON.stringify(this.error1)==JSON.stringify(data)){
        this.status = 'The avatar is required! Please select upload avatar'
      }
      if(JSON.stringify(this.error2)==JSON.stringify(data)){
        this.status = 'The file is required! Please select upload file'
      }
      if(JSON.stringify(this.success)==JSON.stringify(data)){
        this.status = 'Create success!'
      }
    }, error => {
      this.status = 'Please login before create Song'
    })
  }
  onChangeAvatar(event:any){
    this.form.avatarUrl = event;
    this.isCheckUploadAvatar = true;
  }
  onChangeFile(event:any){
    this.form.mp3Url = event;
    this.isCheckUploadFile = true;
  }
}
