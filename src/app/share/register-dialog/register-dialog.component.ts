import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ResgisterUser } from 'src/app/model/ResgisterUser';
import { LoginService } from 'src/app/service/login/login.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

declare var Swal: any;

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});

  get name() {return this.registerForm.get('name')}
  get email() {return this.registerForm.get('email')}
  get username() {return this.registerForm.get('username')}
  get password() {return this.registerForm.get('password')}
  get confirmPassword() {return this.registerForm.get('confirmPassword')}

  message: string;

  newUser: ResgisterUser;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  register(){
    this.newUser = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      username: this.registerForm.value.username,
      password: this.registerForm.value.password
    };
    console.log(this.newUser);
    if(this.confirmPassword == this.password) {
      this.loginService.register(this.newUser).subscribe(res => {
        this.message = res;
        console.log(this.message);
        if (res.message != null) {
          // @ts-ignore
          document.querySelector('.register_dialog').remove()
          // @ts-ignore
          document.querySelector('.modal-backdrop').remove()
          document.body.classList.remove('modal-open')
          this.modalService.show(LoginDialogComponent);
        }
      });
    }
  }
}
