import { Injectable } from '@angular/core';
import { PlaylistResponse } from "../../model/PlaylistResponse";

@Injectable({
  providedIn: 'root'
})
export class AddSongDialogService {
  playlistSongCurrent:PlaylistResponse;
  id:any;

  constructor() {
  }
}
