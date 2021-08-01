import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpService} from "../http/http.service";
import {Observable} from "rxjs";
import {Song} from "../../model/Song";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SongService {
   API_URL = `${environment.API_URL}`;

  constructor(private http: HttpClient,
              private httpService: HttpService) {}

  getAllSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.API_URL + '/song/songs');
  }

  createSong(song:Song):Observable<Song>{
      return this.http.post<Song>(this.API_URL+ '/song/create',song);
  }
  searchSong(nameSong:String): Observable<Song[]>{
    return this.http.get<Song[]>(this.API_URL + 'song/search-song' + nameSong);
  }
  getSongByName(name: string): Observable<Song[]> {
    return this.http.post<Song[]>(this.API_URL + '/song/search' , name);
  }
}
