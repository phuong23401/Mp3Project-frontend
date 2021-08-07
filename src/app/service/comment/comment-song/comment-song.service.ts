

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../../../environments/environment";
import {HttpService} from "../../http/http.service";
import {Commentsong} from "../../../model/CommentSong";
const API_URL = `${environment.API_URL}`;
@Injectable({
  providedIn: 'root'
})
export class CommentSongService {

  constructor(private http: HttpClient,
    private httpService : HttpService) { }

    createCommentSong(commentsong: Commentsong): Observable<any> {
      return this.http.post(API_URL + '/comment-song', commentsong, this.httpService.getHttp());
    }
  getCommentBySong(song_id: number): Observable<any>{
    return this.http.get<any>(API_URL + '/home/comment-song/' + song_id);
  }
}
