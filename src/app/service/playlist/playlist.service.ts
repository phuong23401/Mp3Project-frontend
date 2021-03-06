import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Playlist } from 'src/app/model/Playlist';
import { PlaylistResponse } from "../../model/PlaylistResponse";
import { Song } from "../../model/Song";
import { AddSongToPlaylistReq } from "../../model/AddSongToPlaylistReq";
import { HttpService } from "../http/http.service";

const API_URL = `${environment.API_URL}`;
@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private httpClient: HttpClient,
              private httpService: HttpService) { }

  getAllPlaylist(): Observable<Playlist> {
    return this.httpClient.get<Playlist>(API_URL + "/home/getAll");
  }

  addSongToPlaylist(addSong:AddSongToPlaylistReq):Observable<any>{
    return this.httpClient.put<any>(API_URL+"/playlist/addsong",addSong)
  }

  creatPlaylist(playlist: Playlist): Observable<Playlist> {
    return this.httpClient.post<Playlist>(API_URL + "/playlist/create", playlist);
  }

  updatePlaylist(id: number, playlist: Playlist): Observable<Playlist> {
    return this.httpClient.put<Playlist>(API_URL + "/playlist/" + id, playlist);
  }

  upPlaylist(playlist: Playlist): Observable<any> {
    return this.httpClient.put(API_URL + '/playlist/update' , playlist  , this.httpService.getHttp());
  }

  deletePlaylist(id: number): Observable<Playlist> {
    return this.httpClient.post<Playlist>(API_URL + "/playlist/delete",id);
  }

  getPlaylistByUser(): Observable<PlaylistResponse[]> {
    return this.httpClient.get<PlaylistResponse[]>(API_URL + "/playlist");
  }

  getTopListened(): Observable<Playlist[]> {
    return this.httpClient.get<Playlist[]>(API_URL + "/home/topListenedPlaylist");
  }

  getTopLiked(): Observable<Playlist[]> {
    return this.httpClient.get<Playlist[]>(API_URL + "/home/topLikedPlaylist");
  }

  getNewlestCreated(): Observable<Playlist[]> {
    return this.httpClient.get<Playlist[]>(API_URL + "/home/newlestCreatedPlaylist");
  }

  countSongInPlaylist(id: number): Observable<Number>{
    return this.httpClient.get<Number>(API_URL + "/countSongInPlaylist/" + id);
  }

  getSongOfPlaylist(id: any): Observable<Song[]>{
    return this.httpClient.get<Song[]>(API_URL+ "/home/getallsong/" + id);
  }

  getPlaylist(id:any): Observable<PlaylistResponse>{
    return this.httpClient.get<PlaylistResponse>(API_URL+"/home/get/" +id);
  }

  getPlaylistById(id: number): Observable<Playlist> {
    return this.httpClient.get<Playlist>(API_URL + '/home/playlist/' + id);
  }

  countListenPLaylistById(id: number): Observable<Playlist> {
    return this.httpClient.get<Playlist>(API_URL + '/home/countListenPlaylist/' + id);
  }
}
