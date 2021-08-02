import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const API_URL = `${environment.API_URL}`;
@Injectable({
  providedIn: 'root'
})

export class ChecktokenService {

  constructor(private httpClient: HttpClient) { }
  checkToken(data:any):Observable<any>{
    return this.httpClient.post<any>(API_URL + "/check", data);
  }
}
