import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EditProfile } from 'src/app/model/EditProfile';

const API_URL = `${environment.API_URL}`;
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  updateProfile(data: any): Observable<any> {
    return this.httpClient.put(API_URL + "/profile/changeinfor", data);
  }

  getUserCurrent(): Observable<EditProfile> {
    return this.httpClient.get<EditProfile>(API_URL + "/profile/getuser");
  }

  changePassword(data: any): Observable<any>{
    return this.httpClient.put(API_URL + "/profile/changepassword", data);
  }
}
