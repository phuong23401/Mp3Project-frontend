import { TokenService } from 'src/app/service/token/token.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from "../../service/profile/profile.service";
import { Password } from "../../model/Password";
import { Message } from "../../model/Message";

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  changePasswordForm: FormGroup = new FormGroup({});
  requestPassword: Password;
  messageResponse: Message;
  constructor(private formBuilder: FormBuilder,
              private profileSerive: ProfileService,
              private tokenService: TokenService) {

  }


  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  });
    console.log(this.tokenService.getName());

  }
  get  currentPassword(){ return this.changePasswordForm.get('currentPassword')};
  get  newPassword(){ return this.changePasswordForm.get('newPassword')};
  get   confirmPassword(){ return this.changePasswordForm.get('confirmPassword')};

  changePassword(){
    const data = this.changePasswordForm.value;
    console.log(data);
    this.requestPassword=({
      id: this.tokenService.getName(),
      password: data.currentPassword,
      newPassword: data.newPassword
    });
    this.profileSerive.changePassword(this.requestPassword).subscribe(mes=>{
      this.messageResponse ={
        message: mes
      }
      alert(mes.message);
    });
  }
}
