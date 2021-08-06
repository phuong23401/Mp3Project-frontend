import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Playlist } from 'src/app/model/Playlist';

const API_URL = `${environment.API_URL}`;
@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private httpClient: HttpClient) { }

  getAllPlaylist(): Observable<Playlist> { 
    return this.httpClient.get<Playlist>(API_URL + "/playlist/getAll");
  }

  creatPlaylist(playlist: Playlist): Observable<Playlist> {
    return this.httpClient.post<Playlist>(API_URL + "/playlist/create", playlist);
  }

  updatePlaylist(id: number, playlist: Playlist): Observable<Playlist> {
    return this.httpClient.put<Playlist>(API_URL + "/playlist/edit" + id, playlist);
  }

  deletePlaylist(id: number): Observable<Playlist> {
    return this.httpClient.delete<Playlist>(API_URL + "/playlist/" + id);
  }

  getPlaylistById(id: number): Observable<Playlist> {
    return this.httpClient.get<Playlist>(API_URL + "/playlist/" + id);
  }

  getTopListened(): Observable<Playlist[]> {
    return this.httpClient.get<Playlist[]>(API_URL + "/home/topListened");
  }

  getTopLiked(): Observable<Playlist[]> {
    return this.httpClient.get<Playlist[]>(API_URL + "/home/topLiked");
  }

  getNewlestCreated(): Observable<Playlist[]> {
    return this.httpClient.get<Playlist[]>(API_URL + "/home/newlestCreated");
  }
}
