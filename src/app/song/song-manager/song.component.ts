import { Component, OnInit } from '@angular/core';
import {SongService} from "../../service/song/song.service";
import {Router} from "@angular/router";
import {Song} from "../../model/Song";

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  listSong:Song[]=[];
  constructor(private songService: SongService) {
    this.songService.getAllSongs().subscribe((data:Song[])=>{
      this.listSong = data;
    })
  }

  ngOnInit(): void {
  }

}
