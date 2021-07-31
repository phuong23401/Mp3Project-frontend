import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataSource = new BehaviorSubject<any>('truyền dữ liệu mp3');
  currentData= this.dataSource.asObservable();


  constructor() { }
}
