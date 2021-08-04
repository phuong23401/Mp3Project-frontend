import { BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { TokenService } from 'src/app/service/token/token.service';
import { Router } from '@angular/router';
import { SingerService } from 'src/app/service/singer/singer.service';
import { Singers } from 'src/app/model/Singers';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isLogin = false;
  singer : Singers[];
  token: string;

  constructor(private modalService: BsModalService,
              private tokenService: TokenService,
              private router: Router,
              private singerService: SingerService) {
    this.token = this.tokenService.getToken();
    if(this.token != null) {
      this.isLogin = true;
    }
  }

  ngOnInit(): void {
    this.singerService.getAllSinger().subscribe(res =>{
      this.singer = res;
    })
  }

  login() {
    this.modalService.show(LoginDialogComponent);
  }

  home() {
    this.router.navigate(['']);
  }
}
