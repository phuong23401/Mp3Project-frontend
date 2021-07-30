import { Component, OnInit } from '@angular/core';
import {SongService} from "../song/song.service";

@Component({
  selector: 'app-createsong',
  templateUrl: './createsong.component.html',
  styleUrls: ['./createsong.component.css']
})
export class CreatesongComponent implements OnInit {

  constructor(private songsv:SongService) { }

  ngOnInit(): void {
  }

}
