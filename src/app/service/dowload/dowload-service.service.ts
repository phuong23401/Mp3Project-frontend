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
  downloadFile(): any {
		return this.http.get('http://localhost:8080/home/employees/download', {responseType: 'blob'});
  }
}
