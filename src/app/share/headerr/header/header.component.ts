import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LoginDialogComponent } from '../../login-dialog/login-dialog.component';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {SongService} from "../../../service/song/song.service";
import {Router} from "@angular/router";
import {query} from "@angular/animations";
import { RegisterDialogComponent } from '../../register-dialog/register-dialog.component';
import { DataService } from '../../dataTrans/data.service';
import { Song } from 'src/app/model/Song';
import { User } from 'src/app/model/User';
import { Singers } from 'src/app/model/Singers';
import { UserService } from 'src/app/service/user/user.service';
import {PlaylistService} from "../../../service/playlist/playlist.service";
import {Playlist} from "../../../model/Playlist";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  conditsion: boolean;
  isCheck = true;
  songList: Song[];
  searchValue: any;
  listFilterResult : Song[];
  listFilterUserResult : User[];
  listFilterSingerResult : Singers[];
  listFilterPlayListResult: Playlist[];
  listResult: Playlist;
  playList: Playlist[];
  nameSinger = [];


  searchForm: FormGroup;


  constructor(private modalService: BsModalService,
              private songService: SongService,
              private formBuilder: FormBuilder,
              private router: Router,
              private data: DataService,
              private userService: UserService,
              private playListService: PlaylistService) {
    this.searchForm = new FormGroup({
      name: new FormControl(),
    });
    this.playListService.getAllPlaylist().subscribe(res =>{
      this.listResult = res;
    })
  }

  ngOnInit(): void {
    this.songService.getAllSongs().subscribe(res =>{
      this.songList = res;
    })

  }

  login() {
    this.modalService.show(LoginDialogComponent)
  }

  register() {
    this.modalService.show(RegisterDialogComponent)
  }

  filterKeyWord() {
    var filterResult = [];
    this.conditsion = true;
    this.isCheck = false;
    console.log(this.searchValue)
    if (this.searchValue.length === 0) {
      this.isCheck = true;
    } else {

      this.listFilterResult = this.songList;
      var keyWord = this.searchValue.toLowerCase();
      this.listFilterResult.map(item => {
        let username = item.user.name.toLowerCase();
        let name = item.name.toLowerCase();
        let author = item.author.toLowerCase();
        let singer = item.singer.filter(res =>{
          return res.name.toLowerCase().match(keyWord)

        }) ;
        for (let i = 0; i < this.songList.length; i++) {
          let singer_1 = this.songList[i].singer;
          for (let j = 0; j < singer_1.length; j++) {
            let name = singer_1[j].name;
            if (!this.nameSinger.includes(name)){
              this.nameSinger.push(name);
            }
          }
        }
        console.log("name singer ",this.nameSinger)

        if (name.includes(keyWord) || username.includes(keyWord)|| author.includes(keyWord) || singer.includes(keyWord)) {
          filterResult.push(item);
        }
      });
    }  if ( this.searchValue === 0){
      this.isCheck = true;
    }else {
      this.listFilterPlayListResult = this.playList;
      var keyWord = this.searchValue.toLowerCase();
      this.listFilterPlayListResult.map(item => {
        let name = item.name.toLowerCase();
        if (name.includes(keyWord) ) {
          filterResult.push(item);
        }
      });
    }
    this.listFilterPlayListResult = filterResult;
    if (this.listFilterPlayListResult.length !== 0) {
      this.conditsion = true;
    } else {
      this.conditsion = false;
    }
  }

}
