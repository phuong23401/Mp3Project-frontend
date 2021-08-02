import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  changePasswordForm: FormGroup = new FormGroup({});
  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  });
  }
  get  currentPassword(){ return this.changePasswordForm.get('currentPassword')};
  get  newPassword(){ return this.changePasswordForm.get('newPassword')};
  get   confirmPassword(){ return this.changePasswordForm.get('confirmPassword')};

}
