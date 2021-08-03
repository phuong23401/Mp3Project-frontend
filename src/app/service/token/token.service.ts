import { Injectable } from '@angular/core';

const tokenKey = "token";
const idKey = "id";
const usernameKey = "username";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken() {
    return window.sessionStorage.getItem(tokenKey);
  }

  setToken(token: string) {
    window.sessionStorage.removeItem(tokenKey);
    window.sessionStorage.setItem(tokenKey, token);
  }

  getId() {
    return window.sessionStorage.getItem(idKey);
  }

  setId(id: string) {
    window.sessionStorage.removeItem(idKey);
    window.sessionStorage.setItem(idKey, id);
  }

  getUsername() {
    return window.sessionStorage.getItem(usernameKey);
  }
  
  setUsername(username: any) {
    window.sessionStorage.removeItem(usernameKey);
    window.sessionStorage.setItem(usernameKey, username);
  }
}
