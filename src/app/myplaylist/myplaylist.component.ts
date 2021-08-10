import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../service/playlist/playlist.service';
import { PlaylistResponse } from '../model/PlaylistResponse';
import Swal from 'sweetalert2';
import {TokenService} from "../service/token/token.service";

@Component({
  selector: 'app-myplaylist',
  templateUrl: './myplaylist.component.html',
  styleUrls: ['./myplaylist.component.css'],
})
export class MyplaylistComponent implements OnInit {
  listPlaylist: PlaylistResponse[] = [];
  messageResponse: any = {
    message: 'successfully!',
  };
  isLogin = false;

  token: string;
  status = '';
  check = true;

  constructor(private playListService: PlaylistService,
              private tokenService: TokenService) {
    this.token = this.tokenService.getToken();
    if(this.token != null) {
      this.isLogin = true;
    }
    this.getPlaylist();
    this.check = false;
  }

  ngOnInit(): void {}

  getPlaylist() {
    this.playListService.getPlaylistByUser().subscribe((data) => {
      this.listPlaylist = data;
      if (this.listPlaylist.length>0){
        this.check = true;
      }
    });
  }




  playListDetails($event: any) {}

  deletePlaylist(id: number) {
    console.log('enter');
    this.playListService.deletePlaylist(id).subscribe(
      (data) => {
          this.status = 'Successfully !';
          Swal.fire({
            title: this.status,
            text: ' ',
            icon: 'success',
            confirmButtonColor: '#3bc8e7',
          });
          this.getPlaylist();
      },
      (error) => {
        this.status = 'Error server !';
        Swal.fire({
          title: this.status,
          text: ' ',
          icon: 'error',
          confirmButtonColor: '#3bc8e7',
        });
      }
    );
  }
}
