import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TokenService } from 'src/app/service/token/token.service';
import { Song } from 'src/app/model/Song';
import { SongService } from '../../../service/song/song.service';
import { EditProfile } from 'src/app/model/EditProfile';
import { ProfileService } from 'src/app/service/profile/profile.service';

@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.css'],
})
export class Header1Component implements OnInit {
  searchForm: FormGroup;
  usernameCurrent: string;
  conditsion: boolean;
  isCheck = true;
  songList: Song[];
  searchValue: any;
  listFilterResult: Song[];

  userCurrent: EditProfile = {};

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private songService: SongService,
    private profileService: ProfileService
  ) {
    this.usernameCurrent = this.tokenService.getUsername();
    console.log(this.usernameCurrent);
    this.searchForm = new FormGroup({
      name: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.songService.getAllSongs().subscribe((res) => {
      this.songList = res;
    });

    this.profileService.getUserCurrent().subscribe((data) => {
      this.userCurrent = data;
    });
  }

  profile() {
    this.router.navigate(['/updateProfile']);
  }

  changePassword() {
    this.router.navigate(['/changepassword']);
  }

  createSong() {
    this.router.navigate(['/createsong']);
  }
  myPlaylist() {
    this.router.navigate(['/myplaylist']);
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.clear();
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }

  filterKeyWord() {
    var filterResult = [];
    this.conditsion = true;
    this.isCheck = false;

    if (this.searchValue.length === 0) {
      this.isCheck = true;
    } else {
      this.listFilterResult = this.songList;
      var keyWord = this.searchValue.toLowerCase();
      this.listFilterResult.map((item) => {
        var username = item.user.name.toLowerCase();
        var name = item.name.toLowerCase();
        var author = item.author.toLowerCase();
        if (name.includes(keyWord) || username.includes(keyWord) || author.includes(keyWord)) {
          filterResult.push(item);
        }
      });
    }
    this.listFilterResult = filterResult;
    if (this.listFilterResult.length !== 0) {
      this.conditsion = true;
    } else {
      this.conditsion = false;
    }
  }
}
