import { Injectable } from '@angular/core';

const tokenKey = "token";
const nameKey = "name";
const roleKey = "role";

@Injectable({
  providedIn: 'root'
})
export class TokenService {


  constructor() { }

  getToken() {
    
    console.log(window.sessionStorage.getItem(tokenKey));
    
  }

  getName() {
    return window.sessionStorage.getItem(nameKey);
  }
}
