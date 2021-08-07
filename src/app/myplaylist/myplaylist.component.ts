import {Component, OnInit} from '@angular/core';
import {PlaylistService} from "../service/playlist/playlist.service";
import {PlaylistResponse} from "../model/PlaylistResponse";
import Swal from "sweetalert2";

@Component({
  selector: 'app-myplaylist',
  templateUrl: './myplaylist.component.html',
  styleUrls: ['./myplaylist.component.css']
})
export class MyplaylistComponent implements OnInit {
  listPlaylist: PlaylistResponse[] = [];
  messageResponse: any = {
    message: "successfully!"
  }
  status = "";
  constructor(private playListService: PlaylistService) {
    this.getPlaylist();
  }

  getPlaylist() {
    this.playListService.getPlaylistByUser().subscribe(data => {
      this.listPlaylist = data;
    });
  }



  ngOnInit(): void {
  }

  playListDetails($event: any) {

  }

  deletePlaylist(id: number) {
    console.log("enter")
    this.playListService.deletePlaylist(id).subscribe(data => {
      if (JSON.stringify(this.messageResponse) == JSON.stringify(data)) {
        this.status = 'Successfully !';
        Swal.fire({
          title: this.status,
          icon: "success",
          confirmButtonColor: "#3bc8e7"
        });
        this.getPlaylist();
      }
    }, error => {
      this.status = "error server"
      Swal.fire({
        title: this.status,
        icon: "error",
        confirmButtonColor: "#3bc8e7"
      });
    })
  }

}
