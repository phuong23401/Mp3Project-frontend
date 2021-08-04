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



// message:any;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private modalService: BsModalService) { }

  // isControlHasError(controlName: string, validationType: string): boolean {
  //   const control = this.registerForm.controls[controlName];
  //   if (!control) {
  //     return false;
  //   }
  //   const result = control.hasError(validationType) && (control.touched || control.dirty);
  //   return result;
  // }

  ngOnInit(): void {
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
    // if (this.registerForm.invalid) {
      this.newUser = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        username: this.registerForm.value.username,
        password: this.registerForm.value.password
      };
      console.log(this.newUser);
      if(this.confirmPassword.value == this.password.value) {
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
        },error => {
          this.message = "Loi cmnr";
          console.log(this.message);
          this.modalService.show(RegisterDialogComponent);
        });
      }
    }
  // }
}
