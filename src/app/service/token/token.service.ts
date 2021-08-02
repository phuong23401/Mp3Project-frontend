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
    return window.sessionStorage.getItem(tokenKey);
  }

  setName(name: string) {
    window.sessionStorage.removeItem(nameKey);
    window.sessionStorage.setItem(nameKey, name);
  }

  getName() {
    return window.sessionStorage.getItem(nameKey);
  }

  setToken(token: string) {
    window.sessionStorage.removeItem(tokenKey);
    window.sessionStorage.setItem(tokenKey, token);
  }
}
