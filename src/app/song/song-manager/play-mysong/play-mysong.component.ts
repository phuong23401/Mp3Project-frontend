import { Component, OnInit } from '@angular/core';
import {SongService} from "../../../service/song/song.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-play-mysong',
  templateUrl: './play-mysong.component.html',
  styleUrls: ['./play-mysong.component.css']
})
export class PlayMysongComponent implements OnInit {

  id:any;
  song:any;
  constructor(
    private songsv:SongService,
    private activatedRoute: ActivatedRoute,
    private domSanitizer: DomSanitizer,

  ) {
    this.activatedRoute.paramMap.subscribe((paraMap:ParamMap)=>{
      this.id = paraMap.get('id');
      this.song = this.songsv.getSongById(this.id);
    })
  }

  ngOnInit(): void {
  }

  getSrc() {
    const url = 'https://www.youtube.com/embed/' + this.song.id;
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
