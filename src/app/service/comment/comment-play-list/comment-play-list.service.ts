import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpService } from "../../http/http.service";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { CommentPlayList } from "../../../model/CommentPlayList";

@Injectable({
  providedIn: 'root'
})
export class CommentPlayListService {
 API_URL = `${environment.API_URL}`;

  constructor(private http: HttpClient,
              private httpService : HttpService) { }

  createCommentPlayList(commentPlayList: CommentPlayList): Observable<any> {
    return this.http.post(this.API_URL + '/comment-song/playlist', commentPlayList, this.httpService.getHttp());
  }

  getCommentPlayListByPlayList(playList_id: number): Observable<any>{
    return this.http.get<any>(this.API_URL + '/home/comment-play-list/' + playList_id);
  }
}
