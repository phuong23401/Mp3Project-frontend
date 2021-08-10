import { Component, OnInit } from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference} from "@angular/fire/storage";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {Singers} from "../model/Singers";
import {Router} from "@angular/router";
import {SingerService} from "../service/singer/singer.service";

@Component({
  selector: 'app-singer',
  templateUrl: './singer.component.html',
  styleUrls: ['./singer.component.css']
})
export class SingerComponent implements OnInit {
  formCreateSinger: FormGroup = new FormGroup({});
  checkAvt: boolean;
  form: File;
  ref?: AngularFireStorageReference;
  downloadURL?: string;
  singer: Singers;
  messageAlert: string;
  constructor(private singerSerivce: SingerService,
                private afStorage: AngularFireStorage,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.formCreateSinger = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }
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
  creteSinger() {
    const data = this.formCreateSinger.value;
    this.singer = {
      name: data.name,
      description: data.description,
      avatarUrl: this.downloadURL,
    };
    this.singerSerivce.createSinger(this.singer).subscribe(
      (mes) => {
        Swal.fire({
          title: 'Compete',
          icon: 'success',
          confirmButtonColor: '#3bc8e7',
        });
        this.router.navigate(['']);
      },
      (error) => {
        this.messageAlert = error.message;
        Swal.fire({
          title: 'Error',
          text: 'Please check your infor !',
          icon: 'error',
          confirmButtonColor: '#3bc8e7',
        });
      }
    );
  }
  backHome() {
    this.router.navigate(['']);
  }
}
