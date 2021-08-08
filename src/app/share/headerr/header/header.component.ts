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

  searchForm: FormGroup;


  constructor(private modalService: BsModalService,
              private songService: SongService,
              private formBuilder: FormBuilder,
              private router: Router,
              private data: DataService,
              private userService: UserService) {
    this.searchForm = new FormGroup({
      name: new FormControl(),
    });
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
        var name = item.name.toLowerCase();
        if (name.includes(keyWord)) {
          filterResult.push(item);
        }
      });
    }
    this.listFilterResult = filterResult;
    console.log(this.listFilterResult)
    if (this.listFilterResult.length !== 0) {
      this.conditsion = true;
    } else {
      this.conditsion = false;
    }
  }

}
