import { Component, OnInit } from '@angular/core';
import {Song} from "../../../model/Song";
import {ProfileService} from "../../../service/profile/profile.service";
import {User} from "../../../model/User";
import {TokenService} from "../../../service/token/token.service";
import {Commentsong} from "../../../model/CommentSong";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CommentSongService} from "../../../service/comment/comment-song/comment-song.service";
import {HttpService} from "../../../service/http/http.service";
import {ActivatedRoute} from "@angular/router";
import {SongService} from "../../../service/song/song.service";
import {UserService} from "../../../service/user/user.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  song: Song;
  user: User;
  username: any;
  commentSong: Commentsong[];
  form: FormGroup;
  songList : Song[] ;
  userId: number;
  id: number;
  constructor( private  profile: ProfileService,
               private token:TokenService,
               private commentSongService: CommentSongService,
               private formbuild: FormBuilder,
               private httpService: HttpService,
               private router: ActivatedRoute,
               private songService: SongService,
               private userService: UserService) {
    this.form = this.formbuild.group({
      comment: ['']
    });
    this.userId = Number(this.httpService.getID());
    console.log("user id ", this.userId)
    this.router.paramMap.subscribe(paramMap =>{
       this.id = +paramMap.get('id')
      this.songService.getSongById(this.id).subscribe(res =>{
        this.song = res;
      });
    })
    this.songService.getSongById(this.id).subscribe(res =>{
      this.song = res;
      console.log("day la song", this.song)
    });
    this.userService.getUserById(this.httpService.getID()).subscribe(res => {
      this.user = res;
    });
    this.commentSongService.getCommentBySong(this.id).subscribe(res => {
      this.commentSong = res;
    });

    this.profile.getUserCurrent().subscribe(res =>{
      this.user = res;
      console.log(this.user)
    })
  }

  ngOnInit(): void {


  }
  onEnter(){
    const  cmt = {
      content: this.form.value.comment,
      user: this.user,
      song: this.song
    };
    this.commentSongService.createCommentSong(cmt).subscribe(res =>{
      this.commentSongService.getCommentBySong(this.song.id).subscribe(data =>{
        console.log("this song id",this.song.id)
        this.commentSong = data;
        this.form.reset();
      })
      Swal.fire({
        title: "Comment Success",
        icon: 'success',
        showCancelButton: true,

      })
    },error => {
      Swal.fire({
        title: "Comment Fails",
        icon: 'warning',
        showCancelButton: true,
      })
    })
  }

}
