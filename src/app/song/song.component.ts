import { Component, OnInit } from '@angular/core';
import {SongService} from "../service/song/song.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  constructor(private songService: SongService, private router: Router) { }

  ngOnInit(): void {
  }

}
