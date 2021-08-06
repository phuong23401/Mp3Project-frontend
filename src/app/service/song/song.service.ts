import {Injectable} from '@angular/core';
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
  private API_Count_Listen_Song = this.API_URL+'/home/count-listen-song';
  private API_Song = this.API_URL+'/song/songs';
  private API_Song_Like_Up = environment.API_URL+'/home/song-like-up';

  constructor(private http: HttpClient,
              private httpService: HttpService) {
  }

  getAllSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.API_URL + '/home/new');
  }

  getMySong(): Observable<Song[]>{
    return this.http.get<Song[]>(this.API_URL+'/song/mysong');
  }
  getAllPageSongs(): Observable<any> {
    return this.http.get<any>(this.API_URL + '/song/page/song');
  }

  createSong(song: Song): Observable<Song> {
    return this.http.post<Song>(this.API_URL + '/song/create', song);
  }

  searchSong(nameSong: String): Observable<Song[]> {
    return this.http.get<Song[]>(this.API_URL + 'song/search-song' + nameSong);
  }

  getSongByName(name: string): Observable<Song[]> {
    return this.http.post<Song[]>(this.API_URL + '/song/search', name);
  }
  getSongById(id: number): Observable<Song> {
    return this.http.get<Song>(this.API_URL + '/song/song/' + id);
  }
  getAllSongsNew(): Observable<Song[]>{
    return this.http.get<Song[]>(this.API_URL + '/home/song/new');
  }
  topSongsView(): Observable<Song[]> {
    return this.http.get<Song[]>(this.API_URL + '/home/top2mostlistened');
  }
  getListenSongById(id: number): Observable<Song>{
    console.log('id service',id)
    return this.http.get<Song>(`${this.API_Count_Listen_Song}/${id}`)
  }
  getSongsById(id: number): Observable<Song> {
    return this.http.get<Song>(`${this.API_Song}/${id}`);
  }
  deleteSongById(id:number):Observable<any> {
    return this.http.delete<any>(this.API_URL + "/song/" + id);
  }

  updateSong(id:number,song:Song):Observable<any>{
    return this.http.put<any>(this.API_URL+"/song/"+id,song)
  }
  getLikeSongUpById(id: number): Observable<Song> {
    console.log('id service',id)
    return this.http.get<Song>(`${this.API_Song_Like_Up}/${id}`);
  }
}
