import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/User';

const API_URL = `${environment.API_URL}`;
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  updateProfile(data: any): Observable<any> {
    return this.httpClient.put(API_URL + "profile/changeinfor", data);
  }

  getUserCurrent(): Observable<User> {
    return this.httpClient.get<User>(API_URL + "/profile/getuser");
  }

  changePassword(data: any): Observable<any>{
    return this.httpClient.put(API_URL + "/profile/changepassword", data);
  }
}
