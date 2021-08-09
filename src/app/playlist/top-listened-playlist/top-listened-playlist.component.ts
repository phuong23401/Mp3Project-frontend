import { Component, OnInit } from '@angular/core';
import { Playlist } from '../../model/Playlist';
import { PlaylistService } from '../../service/playlist/playlist.service';
import { AddSongDialogComponent } from '../../share/add-song-dialog/add-song-dialog.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddSongDialogService } from '../../service/dialogsong/add-song-dialog.service';

@Component({
  selector: 'app-top-listened-playlist',
  templateUrl: './top-listened-playlist.component.html',
  styleUrls: ['./top-listened-playlist.component.css'],
})
export class TopListenedPlaylistComponent implements OnInit {
  playlistList: Playlist[] = [];
  id: any;

  constructor(
    private playlistService: PlaylistService,
    private modalService: BsModalService,
    private addSongDialog: AddSongDialogService
  ) {
    this.playlistService.getTopListened().subscribe((res) => {
      this.playlistList = res;
    });
  }

  ngOnInit(): void {}

  getModal(id: number) {
    this.id = id;
    this.addSongDialog.id = this.id;
    console.log(this.id);
    this.modalService.show(AddSongDialogComponent);
  }
}
