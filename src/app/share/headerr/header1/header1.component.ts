import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TokenService } from 'src/app/service/token/token.service';

@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.css']
})
export class Header1Component implements OnInit {
  searchForm: FormGroup;

  usernameCurrent: string;

  constructor(private tokenService: TokenService,
              private router: Router) {
    this.usernameCurrent = this.tokenService.getUsername();
    console.log(this.usernameCurrent);
  }

  ngOnInit(): void {
  }

  search() {
    this.router.navigate(['/search'],{ queryParams: { name: this.searchForm.value.nameSearch } })
  }

  profile() {
    this.router.navigate(['/updateProfile']);
  }

  changePassword() {
    this.router.navigate(['/changepassword']);
  }

  createSong() {
    this.router.navigate(['/createsong']);
  }

  logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.clear();
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }
}
