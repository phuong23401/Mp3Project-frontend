import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';
import { TokenService } from '../service/token/token.service';
import {Song} from "../model/Song";
import {SongService} from "../service/song/song.service";

declare var Swal: any;
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({});

  signinForm: FormGroup = new FormGroup({});

  name: any = '';
  isLogin = false;

  songList: Song[] = [];


  constructor(private router: Router,
              private tokenService: TokenService,
              private formBuilder: FormBuilder,
              private loginService: LoginService,
              private songService: SongService) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.songService.getAllSongs().subscribe(res =>{
        this.songList = res;
    });

    this.signinForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  register(){
    const user = {
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      username: this.signupForm.value.username,
      password: this.signupForm.value.password
    };
    console.log(user);
    this.loginService.register(user).subscribe(res => {
      if (res.message != null) {
        this.router.navigate(['/signin']);

        // @ts-ignore
       document.querySelector('.modal-backdrop').remove()
       document.body.classList.remove('modal-open')
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res.message,
        });
      }
    });
  }

  signin() {
    const data = this.signinForm.value;
    console.log(data);
    this.loginService.login(data).subscribe(res => {
      // tslint:disable-next-line:triple-equals
      if (res.id != null) {
        const jwt = res.token;
        sessionStorage.setItem('token', JSON.stringify(jwt));
        sessionStorage.setItem('userId', JSON.stringify(res.id));
        sessionStorage.setItem('name',JSON.stringify(res.username));
        this.router.navigate(['']);

        // @ts-ignore
       document.querySelector('.modal-backdrop').remove()
       document.body.classList.remove('modal-open')
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Đăng nhập thất bại!',
        });
      }
    });
  }
}
