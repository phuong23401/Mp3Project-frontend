import { Component, OnInit } from '@angular/core';
import { Singers } from 'src/app/model/Singers';
import { SingerService } from 'src/app/service/singer/singer.service';

@Component({
  selector: 'app-featured-artists',
  templateUrl: './featured-artists.component.html',
  styleUrls: ['./featured-artists.component.scss']
})
export class FeaturedArtistsComponent implements OnInit {
  singerList: Singers[];
  constructor(private singerService: SingerService) { }

  ngOnInit(): void {
    this.singerService.getAllSinger().subscribe(res =>{
      this.singerList = res;
    })
  }

}
