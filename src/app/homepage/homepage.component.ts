import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Song } from "../model/Song";
import { SongService } from "../service/song/song.service";
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  name: any = '';

  songList: Song[] = [];

  constructor(private router: Router,
              private songService: SongService) {}

  ngOnInit(): void {
    this.songService.getAllSongs().subscribe(res =>{
        this.songList = res;
    });
  }

  logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
