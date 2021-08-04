import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Singers} from "../../model/Singers";

@Injectable({
  providedIn: 'root'
})
export class SingerService {
  API_URL = `${environment.API_URL}`;

  constructor(private httpClient:HttpClient) { }
  getAllSinger():Observable<Singers[]>{
    return this.httpClient.get<Singers[]>(this.API_URL+"/singers/singer")
  }

  createSinger(singer:Singers):Observable<Singers>{
    return this.httpClient.post<Singers>(this.API_URL+"/singers/create",singer)
  }

  updateSinger(id:number,singer:Singers):Observable<Singers>{
    return this.httpClient.put<Singers>(this.API_URL+"/singers/"+id,singer)
  }

  deleteSinger(id:number):Observable<Singers>{
    return this.httpClient.delete<Singers>(this.API_URL+"/singers/"+id)
  }

  findSingerByName(name:String):Observable<Singers>{
    return this.httpClient.post<Singers>(this.API_URL+"/singers/test",name)
  }


}
