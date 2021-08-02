import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';
import { TokenService } from 'src/app/service/token/token.service';

declare var Swal: any;
@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  get username(){ return this.loginForm.get('username')}
  get password(){ return this.loginForm.get('password')}

  name: string;


  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['',[ Validators.required]],
      password: ['',[ Validators.required]]
    });

    if(this.tokenService.getToken()) {
      this.name = this.tokenService.getName();
    }
  }

  login() {
    const data = this.loginForm.value;
    console.log(data);
    this.loginService.login(data).subscribe(res => {
      // tslint:disable-next-line:triple-equals
      if (res.token != undefined) {
        this.tokenService.setToken(res.token);
        this.tokenService.setName(res.name);
        this.name = this.tokenService.getName();
        this.router.navigate(['']).then(() => {
          window.location.reload();
        });

        // @ts-ignore
        document.querySelector('.modal-backdrop').remove()
        document.body.classList.remove('modal-open')
        // @ts-ignore
        document.querySelector('.login_dialog').remove()
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
