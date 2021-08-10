import { Song } from 'src/app/model/Song';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DowloadServiceService {

  constructor(private http: HttpClient) { }
  download(file: string | undefined): Observable<Blob> {
    return this.http.get(`${environment.API_URL}/home/files/${file}`, {
      responseType: 'blob'
    });
  }

  list(): Observable<Song[]> {
    return this.http.get<Song[]>(`${environment.API_URL}/home/files`);
  }
}
