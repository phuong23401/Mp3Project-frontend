import { Injectable } from '@angular/core';
import {PlaylistResponse} from "../../model/PlaylistResponse";
import {SongService} from "../song/song.service";

@Injectable({
  providedIn: 'root'
})
export class AddSongDialogService {
  playlistSongCurrent:PlaylistResponse;
  id:any;
  constructor() {
  }


}
