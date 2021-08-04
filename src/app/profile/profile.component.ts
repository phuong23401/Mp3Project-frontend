import { User } from 'src/app/model/User';
import { Message } from './../model/Message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../service/profile/profile.service';
import { Router } from '@angular/router';
import { EditProfile } from '../model/EditProfile';
import { TokenService } from '../service/token/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});

  get name() { return this.userForm.get('name')};
  get gender() { return this.userForm.get('gender')};
  get hobbies() { return this.userForm.get('hobbies')};
  get avatarUrl() { return this.userForm.get('avatarUrl')};

  userCurrent: EditProfile = {};
  messageResponse: Message;

  constructor(private profileService: ProfileService,
              private formBuilder: FormBuilder,
              private tokenService: TokenService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      hobbies: ['', [Validators.required]],
      avatarUrl: ['', [Validators.required]]
    })
    this.profileService.getUserCurrent().subscribe(data => {
      this.userCurrent = data;
    });
    console.log(this.userCurrent.name);
  }

  updateProfile() {
    const data = this.userForm.value;
    this.userCurrent = ({
      name: data.name,
      gender: data.gender,
      hobbies: data.hobbies,
      avatarUrl: data.avatarUrl,
    });
    this.profileService.updateProfile(this.userCurrent).subscribe(mes => {
      this.messageResponse = {
        message: mes
      }
      alert(this.messageResponse.message.message);
    });
  }

  backHome() {
    this.router.navigate(['']);
  }
}
