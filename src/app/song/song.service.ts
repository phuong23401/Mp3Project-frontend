import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {Song} from "./Song";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SongService {
   API_URL = `${environment.apiUrl}`;

  constructor(private http: HttpClient,
              private httpService: HttpService) {}

  getAllSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.API_URL + '/song/songs');
  }

  createSong(song:Song):Observable<Song>{
      return this.http.post<Song>(this.API_URL+ '/song/create',song);
  }
}
