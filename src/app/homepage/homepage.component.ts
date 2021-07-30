import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { TokenService } from '../service/token/token.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  name: any = '';
  isLogin = false;

  constructor(private router: Router,
              private tokenService: TokenService) {}

  ngOnInit(): void {
    this.getNameFromToken();
  }

  getNameFromToken() {
    // if(this.tokenService.getToken()) {
    //   this.isLogin = true;
    //   this.name = this.tokenService.getName();
    // }
    console.log(this.tokenService.getToken);
  }

  logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
