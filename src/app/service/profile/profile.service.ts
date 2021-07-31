import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/User';

const url = "http://localhost:8080/profile/getuser";
const API_URL = `${environment.API_URL}`;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) {
   }

  updateProfile(user: User): Observable<User> {
    return this.httpClient.put(API_URL + "/profile/changeinfor", user);
  }

  // changePassword(user: User): Observable<User> {
  //   return this.httpClient.put(API_URL + "/changepassword", user);
  // }

  getUserByToken(): Observable<User> {
    return this.httpClient.get<User>(url);
  }
}
