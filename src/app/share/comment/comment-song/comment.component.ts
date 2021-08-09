import {Component, OnInit} from '@angular/core';
import {Song} from "../../../model/Song";
import {ProfileService} from "../../../service/profile/profile.service";
import {User} from "../../../model/User";
import {TokenService} from "../../../service/token/token.service";
import {Commentsong} from "../../../model/CommentSong";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CommentSongService} from "../../../service/comment/comment-song/comment-song.service";
import {HttpService} from "../../../service/http/http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SongService} from "../../../service/song/song.service";
import {UserService} from "../../../service/user/user.service";
import Swal from "sweetalert2";
import {BsModalService} from "ngx-bootstrap/modal";
import {LoginDialogComponent} from "../../login-dialog/login-dialog.component";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  checkLogin = false;
  song: Song;
  user: User;
  username: any;
  commentSong: Commentsong[];
  form: FormGroup;
  songList: Song[];
  userId: number;
  id: number;
  tokenUser: string;

  constructor(private profile: ProfileService,
              private token: TokenService,
              private commentSongService: CommentSongService,
              private formbuild: FormBuilder,
              private modalService: BsModalService,
              private httpService: HttpService,
              private router: ActivatedRoute,
              private songService: SongService,
              private userService: UserService,
              private router1: Router) {
    this.tokenUser = token.getToken();
    if (this.tokenUser != null) {
      this.checkLogin = true;
    }

    this.form = this.formbuild.group({
      comment: ['']
    });
    this.userId = Number(this.httpService.getID());

    this.router.paramMap.subscribe(paramMap => {
      this.id = +paramMap.get('id')
      this.songService.getSongsById(this.id).subscribe(res => {
        this.song = res;
      });
    })
    this.songService.getSongsById(this.id).subscribe(res => {
      this.song = res;

    });
    this.userService.getUserById(this.httpService.getID()).subscribe(res => {
      this.user = res;
    });
    this.commentSongService.getCommentBySong(this.id).subscribe(res => {
      this.commentSong = res;
    });
    this.profile.getUserCurrent().subscribe(res => {
      this.user = res;
    })
  }

  ngOnInit(): void {
  }
  login(){
    this.modalService.show(LoginDialogComponent)
  }

  onEnter() {
    const cmt = {
      content: this.form.value.comment,
      user: this.user,
      song: this.song
    };
    this.commentSongService.createCommentSong(cmt).subscribe(res => {
      this.commentSongService.getCommentBySong(this.id).subscribe(res => {
        this.commentSong = res;
        this.form.reset();
      });
      Swal.fire({
        title: "Comment Success",
        icon: 'success',
        showCancelButton: true,

      })
    }, error => {
      Swal.fire({
        title: "Comment Fails",
        icon: 'warning',
        showCancelButton: true,
      })
    })
  }

}
