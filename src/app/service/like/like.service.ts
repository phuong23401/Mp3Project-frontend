import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LikeSong } from 'src/app/model/LikeSong';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) { }
  private API_List_LikeSong_By_Username = environment.API_URL+'like-song-by-user';
  getListLikeSongByUser(): Observable<LikeSong[]>{
    return this.http.get<LikeSong[]>(this.API_List_LikeSong_By_Username)
  }
}
