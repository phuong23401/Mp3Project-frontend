import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ResgisterUser } from 'src/app/model/ResgisterUser';
import { LoginService } from 'src/app/service/login/login.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import {Message} from "../../model/Message";
import Swal from 'sweetalert2';

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
  errorRegis: string;
  error1: string = "Tài khoản đã tồn tại!";
  error2: string = "Email đã được sử dụng!";
  check:boolean =false;
  check1:boolean = false;
  check2:boolean = false;
  check3:boolean = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private modalService: BsModalService) {
      this.registerForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      },{
        validator: this.MustMatch('password', 'confirmPassword')
      });
    }

  // isControlHasError(controlName: string, validationType: string): boolean {
  //   const control = this.registerForm.controls[controlName];
  //   if (!control) {
  //     return false;
  //   }
  //   const result = control.hasError(validationType) && (control.touched || control.dirty);
  //   return result;
  // }

  ngOnInit(): void {}

  submitted:boolean = false;
  get f() { return this.registerForm.controls; };
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  ch(e:any){
    if(e.checked){
      this.registerForm.controls['password'].setValidators([Validators.required])
      this.registerForm.controls['password'].updateValueAndValidity()
    }
    else{
      this.registerForm.controls['password'].setValidators(null)
      this.registerForm.controls['password'].updateValueAndValidity()
    }
  }

  register(){
    this.submitted = true;
    this.newUser = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      username: this.registerForm.value.username,
      password: this.registerForm.value.password
    };
    if(!this.newUser.name.match('^[\\D]+')) {
      this.check3 = true;
    };
    if(this.confirmPassword.value == this.password.value && this.check3 == false) {
      this.loginService.register(this.newUser).subscribe(res => {
        this.message = res.message;
        Swal.fire({
          title: this.message,
          text: "Login and enjoy !",
          icon: "success",
          confirmButtonColor: "#3bc8e7"
        });
        if (res.message != null) {
          // @ts-ignore
          document.querySelector('.register_dialog').remove();
          // @ts-ignore
          document.querySelector('.modal-backdrop').remove();
          document.body.classList.remove('modal-open');
          this.modalService.show(LoginDialogComponent);
        }
      },error => {
        this.check = true;
        this.errorRegis = error.error.message;
        if(this.errorRegis == this.error1){
          this.check1 = true;
        };
        if(this.errorRegis == this.error2){
          this.check2 = true;
        }
        Swal.fire({
          title: "REGISTER FAILED",
          text: "Please check your infor !",
          icon: "error",
          confirmButtonColor: "#3bc8e7"
        });
      });
    }
  }

  transferLogin() {
    // @ts-ignore
    document.querySelector('.register_dialog').remove();
    // @ts-ignore
    document.querySelector('.modal-backdrop').remove();
    document.body.classList.remove('modal-open');
    this.modalService.show(LoginDialogComponent);
  }

  closeModal() {
    // @ts-ignore
    document.querySelector('.register_dialog').remove();
    // @ts-ignore
    document.querySelector('.modal-backdrop').remove();
    document.body.classList.remove('modal-open');
  }
}
