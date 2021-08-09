import { Component, OnInit } from '@angular/core';
import {Song} from "../../../model/Song";
import {User} from "../../../model/User";
import {Commentsong} from "../../../model/CommentSong";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProfileService} from "../../../service/profile/profile.service";
import {TokenService} from "../../../service/token/token.service";
import {CommentSongService} from "../../../service/comment/comment-song/comment-song.service";
import {HttpService} from "../../../service/http/http.service";
import {ActivatedRoute} from "@angular/router";
import {SongService} from "../../../service/song/song.service";
import {UserService} from "../../../service/user/user.service";
import {CommentPlayList} from "../../../model/CommentPlayList";
import {CommentPlayListService} from "../../../service/comment/comment-play-list/comment-play-list.service";
import {Playlist} from "../../../model/Playlist";
import {PlaylistService} from "../../../service/playlist/playlist.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comment-play-list',
  templateUrl: './comment-play-list.component.html',
  styleUrls: ['./comment-play-list.component.css']
})
export class CommentPlayListComponent implements OnInit {

  playlist: Playlist;
  user: User;
  username: any;
  commentPlayList: CommentPlayList[];
  form: FormGroup;
  songList : Playlist[] ;
  userId: number;
  id: number;
  constructor( private  profile: ProfileService,
               private token:TokenService,
               private commentPlayListService: CommentPlayListService,
               private formbuild: FormBuilder,
               private httpService: HttpService,
               private router: ActivatedRoute,
               private playlistService: PlaylistService,
               private userService: UserService,
               private songSerive: SongService) {
    this.form = this.formbuild.group({
      comment: ['']
    });
    this.userId = Number(this.httpService.getID());
    console.log("user id ", this.userId)
    this.router.paramMap.subscribe(paramMap =>{
      this.id = +paramMap.get('id')
      this.playlistService.getPlaylist(this.id).subscribe(res =>{
        this.playlist = res;
      });
    })
    this.playlistService.getPlaylist(this.id).subscribe(res =>{
      this.playlist = res;

    });
    this.songSerive.getAllSongs().subscribe(res =>{
      this.songList =res;

    })
    this.userService.getUserById(this.httpService.getID()).subscribe(res => {
      this.user = res;
    });
    this.commentPlayListService.getCommentPlayListByPlayList(this.id).subscribe(res => {
      this.commentPlayList = res;
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
      playlist: this.playlist
    };
    this.commentPlayListService.createCommentPlayList(cmt).subscribe(res =>{
      this.commentPlayListService.getCommentPlayListByPlayList(this.id).subscribe(data =>{
        this.commentPlayList = data;
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
