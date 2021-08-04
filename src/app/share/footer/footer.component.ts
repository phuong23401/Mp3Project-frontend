import { BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { TokenService } from 'src/app/service/token/token.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isLogin = false;

  token: string;

  constructor(private modalService: BsModalService,
              private tokenService: TokenService) {
    this.token = this.tokenService.getToken();
    if(this.token != null) {
      this.isLogin = true;
    }
  }

  ngOnInit(): void {
  }

  login() {
    this.modalService.show(LoginDialogComponent);
  }
}
