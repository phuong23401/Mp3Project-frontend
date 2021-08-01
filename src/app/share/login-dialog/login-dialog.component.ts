import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';

declare var Swal: any;
@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  // loginForm: FormGroup = new FormGroup({})
  loginForm: FormGroup = new FormGroup({
  username : new FormControl('', Validators.required),
    password:  new FormControl('', Validators.required)
  });
  get username(){ return this.loginForm.get('username')}
  get password(){ return this.loginForm.get('password')}

  // this.loginForm = this.fb.group({
  //   username: ['', [Validators.required]],
  //   pw: this.fb.group({
  //     password: ['', Validators.required],
  //     confirmPassword: ['', Validators.required]
  //   })
  // });
  isLogin = false;


  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['',[ Validators.required]],
      password: ['',[ Validators.required]]
    });
  }

  login() {
    const data = this.loginForm.value;
    console.log(data);
    this.loginService.login(data).subscribe(res => {
      // tslint:disable-next-line:triple-equals
      if (res.id != null) {
        const jwt = res.token;
        sessionStorage.setItem('token', JSON.stringify(jwt));
        sessionStorage.setItem('userId', JSON.stringify(res.id));
        this.router.navigate(['']);

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
