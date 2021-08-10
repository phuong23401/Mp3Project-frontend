import { BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';
import { TokenService } from 'src/app/service/token/token.service';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  message: string;
  name: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private tokenService: TokenService,
    private modalService: BsModalService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  login() {
    const data = this.loginForm.value;
    let checkName = data.name;
    this.loginService.login(data).subscribe(
      (res) => {
        // tslint:disable-next-line:triple-equals
        if (res.token != undefined) {
          this.tokenService.setToken(res.token);
          this.tokenService.setId(res.id);
          this.tokenService.setUsername(res.username);

          this.router.navigate(['']).then(() => {
            window.location.reload();
          });
        }
      },
      (error) => {
        this.message = 'Login failed !';
        Swal.fire({
          title: this.message,
          text: error.error.message,
          icon: 'error',
          confirmButtonColor: '#3bc8e7',
        });
      }
    );
  }

  transferRegister() {
    // @ts-ignore
    document.querySelector('.modal-backdrop').remove();
    document.body.classList.remove('modal-open');
    // @ts-ignore
    document.querySelector('.login_dialog').remove();
    this.modalService.show(RegisterDialogComponent);
  }

  closeModal() {
    // @ts-ignore
    document.querySelector('.modal-backdrop').remove();
    document.body.classList.remove('modal-open');
    // @ts-ignore
    document.querySelector('.login_dialog').remove();
  }
}
