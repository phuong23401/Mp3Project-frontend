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
  private API_Count_Listen_Song = this.API_URL+'/song/count-listen-song';
  private API_Song = this.API_URL+'/song/song';

  constructor(private http: HttpClient,
              private httpService: HttpService) {
  }

  getAllSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.API_URL + '/song/songs');
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
    return this.http.get<Song[]>(this.API_URL + '/song/top2mostlistened');
  }
  getListenSongById(id: number): Observable<Song>{
    console.log('id service',id)
    return this.http.get<Song>(`${this.API_Count_Listen_Song}/${id}`)
  }
  getSongsById(id: number): Observable<Song> {
    return this.http.get<Song>(`${this.API_Song}/${id}`);
  }
}
