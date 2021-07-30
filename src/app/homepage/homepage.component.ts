import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { TokenService } from '../service/token/token.service';
import {Song} from "../model/Song";
import {SongService} from "../service/song/song.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  name: any = '';
  isLogin = false;
  songList: Song[] = [];

  constructor(private router: Router,
              private tokenService: TokenService,
              private songService: SongService) {}

  ngOnInit(): void {
    this.songService.getAllSongs().subscribe(res =>{
        this.songList = res;
    })
    this.getNameFromToken();
  }

  getNameFromToken() {
    // if(this.tokenService.getToken()) {
    //   this.isLogin = true;
    //   this.name = this.tokenService.getName();
    // }
    console.log(this.tokenService.getToken);
  }

  logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    sessionStorage.clear();
    this.router.navigate(['']);
  }



}
