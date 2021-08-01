import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../service/profile/profile.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { User } from '../model/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});
  id: any;
  token: any;
  userCurrent: User = {};

  constructor(private profileService: ProfileService, 
    private formBuilder: FormBuilder) {
    this.getUserCurrent();
   }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      hobbies: ['', [Validators.required]],
      avatarUrl: ['', [Validators.required]]
    })
  }

  updateProfile() {
    const data = this.userForm.value;
    this.profileService.updateProfile(data).subscribe(() => {
      alert('Profile updated successfully!');
    })
  }

  getUserCurrent() {
    this.profileService.getUserByToken().subscribe(u => {
      this.userCurrent = u;
      console.log(u);
      console.log(this.userCurrent);
    })
  }

}
