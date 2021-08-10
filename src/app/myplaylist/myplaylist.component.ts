import {Component, OnInit} from '@angular/core';
import {PlaylistService} from '../service/playlist/playlist.service';
import {PlaylistResponse} from '../model/PlaylistResponse';
import Swal from 'sweetalert2';
import {Playlist} from '../model/Playlist';

@Component({
  selector: 'app-myplaylist',
  templateUrl: './myplaylist.component.html',
  styleUrls: ['./myplaylist.component.css'],
})
export class MyplaylistComponent implements OnInit {
  listPlaylist: PlaylistResponse[] = [];
  playlist: Playlist;
  messageResponse: any = {
    message: 'successfully!',
  };
  status = '';
  check = true;

  constructor(private playListService: PlaylistService) {
    this.getPlaylist();
    this.check = false;
  }

  ngOnInit(): void {
  }

  getPlaylist() {
    this.playListService.getPlaylistByUser().subscribe((data) => {
      this.listPlaylist = data;

      this.check = true;

    }, error => {
      this.check = false;
      this.status = "The Playlists is Empty...!"
    });
  }

  playListDetails($event: any) {
  }

  deletePlaylist(id: number) {
    this.playListService.deletePlaylist(id).subscribe(
      (data: PlaylistResponse) => {
        this.status = 'Successfully !';

        Swal.fire({
          title: this.status,
          text: ' ',
          icon: 'success',
          confirmButtonColor: '#3bc8e7',
        });
        this.getPlaylist();
        console.log("sau khi xoa" + this.listPlaylist)
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

  listenCount(_playlist: Playlist) {
    // this.playListService.countListenPLaylistById(_playlist.id).subscribe((res) => {
    //   this.playlist = res;
    // });
  }
}
