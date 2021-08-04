import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TokenService} from 'src/app/service/token/token.service';
import {Song} from 'src/app/model/Song';
import {SongService} from "../../../service/song/song.service";

@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.css']
})
export class Header1Component implements OnInit {
  searchForm: FormGroup;

  usernameCurrent: string;
  conditsion: boolean;
  isCheck = true;
  songList: Song[];
  searchValue: any;
  listFilterResult: Song[];


  constructor(
    private tokenService: TokenService,
    private router: Router,
    private songService: SongService) {
    this.usernameCurrent = this.tokenService.getUsername();
    console.log(this.usernameCurrent);
    this.searchForm = new FormGroup({
      name: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.songService.getAllSongs().subscribe(res => {
      this.songList = res;
    })
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
