import { Injectable } from '@angular/core';
import { LikePlayList } from "../../model/LikePlayList";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { HttpService } from "../http/http.service";
import { environment } from "../../../environments/environment";
import { Song } from "../../model/Song";

@Injectable({
  providedIn: 'root'
})
export class LikePlayListService {
  API_URL = `${environment.API_URL}`;
  private API_Song_Like_Up = environment.API_URL+'/home/countLikedPlaylist';

  constructor(private http: HttpClient,
              private httpService: HttpService) { }

  createLikePlayList(likeplaylist: LikePlayList): Observable<any> {
    return this.http.post(this.API_URL + '/like-play-list', likeplaylist, this.httpService.getHttp());
  }

  getLikeSongUpById(id: number): Observable<Song> {
    console.log('id service',id)
    return this.http.get<Song>(`${this.API_Song_Like_Up}/${id}`);
  }
}
