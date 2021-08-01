import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../service/profile/profile.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});
  id: any;
  token: any;

  constructor(private profileService: ProfileService, private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    // this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
    //   this.id = paramMap.get('id');
    //   this.getCustomer(this.id);
    // });
   }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      hobbies: ['', [Validators.required]],
      avatarUrl: ['', [Validators.required]]
    })
    this.getUserByToken();
  }

  updateProfile() {
    const data = this.userForm.value;
    this.profileService.updateProfile(data).subscribe(() => {
      alert('Profile updated successfully!');
    })
  }

  getUserByToken() {
    this.token = sessionStorage.getItem('token');
    console.log(this.token);
  }

}
