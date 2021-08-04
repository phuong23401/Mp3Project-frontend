import { Message } from './../model/Message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../service/profile/profile.service';
import { Router } from '@angular/router';
import { EditProfile } from '../model/EditProfile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});

  form: any = {};

  get name() { return this.userForm.get('name')};
  get gender() { return this.userForm.get('gender')};
  get hobbies() { return this.userForm.get('hobbies')};
  // get avatarUrl() { return this.userForm.get('avatarUrl')};

  userCurrent: EditProfile = {};
  messageResponse: Message;

  constructor(private profileService: ProfileService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      hobbies: ['', [Validators.required]],
      // avatarUrl: ['', [Validators.required]]
    })
    this.profileService.getUserCurrent().subscribe(data => {
      this.userCurrent = data;
    });
  }

  updateProfile() {
    const data = this.userForm.value;
    this.userCurrent = ({
      name: data.name,
      gender: data.gender,
      hobbies: data.hobbies,
      avatarUrl: this.form.avatarUrl,
    });
    console.log(this.userCurrent);
    this.profileService.updateProfile(this.userCurrent).subscribe(mes => {
      this.messageResponse = {
        message: mes
      }
      alert(this.messageResponse.message.message);
    });
  }

  onChangeAvatar(event: any) {
    this.form.avatarUrl = event;
    // this.isCheckUploadAvatar = true;
  }

  backHome() {
    this.router.navigate(['']);
  }
}
