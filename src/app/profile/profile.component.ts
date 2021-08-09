import {
  AngularFireStorageReference,
  AngularFireStorage,
} from '@angular/fire/storage';
import { Message } from './../model/Message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../service/profile/profile.service';
import { Router } from '@angular/router';
import { EditProfile } from '../model/EditProfile';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});

  form: File;
  ref?: AngularFireStorageReference;
  downloadURL?: string;

  get name() {
    return this.userForm.get('name');
  }
  get gender() {
    return this.userForm.get('gender');
  }
  get hobbies() {
    return this.userForm.get('hobbies');
  }

  userCurrent: EditProfile = {};
  userRequest: EditProfile = {};
  messageResponse: Message;

  checkAvt: boolean;
  messageAlert: string;
  checkName: any;

  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private router: Router,
    private afStorage: AngularFireStorage
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      hobbies: ['', [Validators.required]],
    });

    this.profileService.getUserCurrent().subscribe((data) => {
      this.userCurrent = data;
    });

    this.checkAvt = false;
  }

  ngOnInit(): void {}

  onChangeAvatar(event: any) {
    this.form = event.target.files[0];
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);

    this.ref
      .put(this.form)
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL();
      })
      .then((downloadURL) => {
        this.checkAvt = true;
        this.downloadURL = downloadURL;
        return downloadURL;
      })
      .catch((error) => {
        console.log(`Failed to upload avatar and get link ${error}`);
      });
  }

  updateProfile() {
    const data = this.userForm.value;
    this.userRequest = {
      name: data.name,
      gender: data.gender,
      hobbies: data.hobbies,
      avatarUrl: this.downloadURL,
    };
    this.checkName = this.userRequest.name;

    if (this.userRequest.name === '') {
      this.userRequest.name = this.userCurrent.name;
    }
    if (this.userRequest.avatarUrl === '') {
      this.userRequest.avatarUrl = this.userCurrent.avatarUrl;
    }
    if (!this.checkName.match('^[\\D]+')) {
      Swal.fire({
        title: "Name can't has number !",
        text: 'Please check your infor !',
        icon: 'error',
        confirmButtonColor: '#3bc8e7',
      });
    } else {
      this.profileService.updateProfile(this.userRequest).subscribe(
        (mes) => {
          this.messageAlert = mes.message;
          Swal.fire({
            title: this.messageAlert,
            icon: 'success',
            confirmButtonColor: '#3bc8e7',
          });
          this.router.navigate(['']);
        },
        (error) => {
          this.messageAlert = error.message;
          Swal.fire({
            title: this.messageAlert,
            text: 'Please check your infor !',
            icon: 'error',
            confirmButtonColor: '#3bc8e7',
          });
        }
      );
    }
  }

  backHome() {
    this.router.navigate(['']);
  }
}
