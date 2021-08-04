import { TokenService } from 'src/app/service/token/token.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from "../../service/profile/profile.service";
import { Password } from "../../model/Password";
import { Message } from "../../model/Message";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  changePasswordForm: FormGroup = new FormGroup({});

  get  currentPassword() { return this.changePasswordForm.get('currentPassword')};
  get  newPassword() { return this.changePasswordForm.get('newPassword')};
  get  confirmPassword() { return this.changePasswordForm.get('confirmPassword')};

  requestPassword: Password;
  messageResponse: Message;

  messageAlert: string;

  constructor(private formBuilder: FormBuilder,
              private profileService: ProfileService,
              private tokenService: TokenService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    },{
      validator: this.MustMatch('newPassword', 'confirmPassword')
    });
  }

  changePassword() {
    const data = this.changePasswordForm.value;
    this.requestPassword = ({
      password: data.currentPassword,
      newPassword: data.newPassword
    });
    if(this.requestPassword.newPassword.length < 6) {
      Swal.fire({
        title: "PASSWORD MUST BE AT LEAST 6 CHARACTERS !", 
        icon: "error",
        confirmButtonColor: "#3bc8e7"
      });
    } else {
      this.profileService.changePassword(this.requestPassword).subscribe(mes => {
        this.messageAlert = mes.message;
        Swal.fire({
          title: this.messageAlert, 
          icon: "success",
          confirmButtonColor: "#3bc8e7"
        });
        this.router.navigate(['']);
      }, error => {
        this.messageAlert = error.error.message;
        Swal.fire({
          title: this.messageAlert,
          text: "Please check your infor !",
          icon: "error",
          confirmButtonColor: "#3bc8e7"
        });
      });
    }
  }

  ch(e:any){
    if(e.checked){
      this.changePasswordForm.controls['password'].setValidators([Validators.required])
      this.changePasswordForm.controls['password'].updateValueAndValidity()
    }
    else{
      this.changePasswordForm.controls['password'].setValidators(null)
      this.changePasswordForm.controls['password'].updateValueAndValidity()
    }
  }

  submitted:boolean = false;
  get f() { return this.changePasswordForm.controls; };
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

  backHome() {
    this.router.navigate(['']);
  }
}
