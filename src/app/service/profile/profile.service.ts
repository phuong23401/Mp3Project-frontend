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

  updateProfile(user: User): Observable<User> {
    return this.httpClient.put(API_URL + "/changeinfor", user);
  }

  changePassword(user: User): Observable<User> {
    return this.httpClient.put(API_URL + "/changepassword", user);
  }
}
