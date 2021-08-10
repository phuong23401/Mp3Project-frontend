import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {TokenService} from "../token/token.service";
import {BsModalService} from "ngx-bootstrap/modal";
import {AddSongDialogComponent} from "../../share/add-song-dialog/add-song-dialog.component";
import {LoginDialogComponent} from "../../share/login-dialog/login-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private tokenService:TokenService,
              private modal:BsModalService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.tokenService.getToken()){
      return true;
    }else {
      this.modal.show(LoginDialogComponent);
      return false;
    }

  }

}
