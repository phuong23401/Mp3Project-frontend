import { Component } from '@angular/core';
import { TokenService } from './service/token/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogin = false;

  token: string;

  title = 'front-end';

  constructor(private tokenService: TokenService) {
    this.token = this.tokenService.getToken();
    if(this.token != null) {
      this.isLogin = true;
    }
  }
}
