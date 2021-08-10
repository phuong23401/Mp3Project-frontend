import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { Icategory } from "../../model/Icategory";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  API_URL = `${environment.API_URL}`;

  constructor(private httpclient:HttpClient) { }

  getAllCategory(): Observable<Icategory[]> {
    return this.httpclient.get<Icategory[]>(this.API_URL + '/category/categories');
  }

  getCategoryById(id:number):Observable<Icategory>{
    return this.httpclient.get<Icategory>(this.API_URL+'/category/'+id)
  }
}
