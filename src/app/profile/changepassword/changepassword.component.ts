import { TokenService } from 'src/app/service/token/token.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from "../../service/profile/profile.service";
import { Password } from "../../model/Password";
import { Message } from "../../model/Message";
import { Router } from '@angular/router';

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
    });
    // console.log(this.tokenService.getName());
  }

  changePassword() {
    const data = this.changePasswordForm.value;
    console.log(data);
    this.requestPassword = ({
      password: data.currentPassword,
      newPassword: data.newPassword
    });
    this.profileService.changePassword(this.requestPassword).subscribe(mes => {
      this.messageResponse = {
        message: mes
      }
      alert(this.messageResponse.message);
    });
  }

  backHome() {
    this.router.navigate(['']);
  }
}