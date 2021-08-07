import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {HttpService} from "../http/http.service";
import {Observable} from "rxjs";
import {User} from "../../model/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL = `${environment.API_URL}`;
  private API_GET_USER = this.API_URL+'/profile/get';
  constructor(private http: HttpClient,
              private httpService: HttpService) { }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.API_GET_USER}/${id}`,this.httpService.getHttp());
  }
}
