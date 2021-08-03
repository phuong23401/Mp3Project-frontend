import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import {TokenService} from "../../../service/token/token.service";

@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.css']
})
export class Header1Component implements OnInit {
  searchForm: FormGroup;
 nameuser: string;

  constructor(private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private router: Router,
              private tokenService: TokenService) {}

  ngOnInit(): void {
    this.nameuser = this.tokenService.getUsername();
    console.log(this.nameuser);
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
